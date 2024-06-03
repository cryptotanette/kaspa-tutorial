const { ClientWrapper, Wallet } = require("kaspa-rpc-client");

async function rpcClient(params) {
  const wrapper = new ClientWrapper({
    hosts: ["kaspadns.kaspacalc.net:16110"],
    verbose: true,
  });

  await wrapper.initialize();

  const client = await wrapper.getClient();

  const block = await client.getBlock({
    hash: "6ef1913d30316304254aa5ce6c34ff9dd2b519231bb80194d4b5e5449412e924",

    includeTransactions: true,
  });
  console.log("block: ", block);

  const utxos = await client.getUtxosByAddresses({
    addresses: [
      "kaspa:qrrzeucwfetuty3qserqydw4z4ax9unxd23zwp7tndvg7cs3ls8dvwldeayv5",
    ],
  });
  console.log("utxos: ", utxos);

  const balance = await client.getBalanceByAddress({
    address:
      "kaspa:qrrzeucwfetuty3qserqydw4z4ax9unxd23zwp7tndvg7cs3ls8dvwldeayv5",
  });
  console.log("balance: ", balance.balance);

  const { phrase, entropy } = Wallet.randomMnemonic();
  console.log("wallet phrase: ", phrase);
  const wallet = Wallet.fromPhrase(client, phrase);

  const account = await wallet.account();
  // console.log("wallet account: ", account);

  const tx = await account.send({
    outputs: [
      {
        recipient: "ADDRESS_1",
        amount: BigInt(1 * 1e8),
      },
    ],
    changeAddress: "CHANGE_ADDRESS",
    // fee: BigInt(1000), // optional, if not passed, the fee will be calculated automatically
    // priorityFee: 1000, // optional, default is 0
  })
}

module.exports = rpcClient;
