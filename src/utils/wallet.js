const { Wallet, initKaspaFramework } = require("@kaspa/wallet");
const { RPC } = require("@kaspa/grpc-node");

async function createWallet() {
  console.log("start");
  await initKaspaFramework();

  const network = "kaspatest";
  const { port } = Wallet.networkTypes["kaspatest"].port; // default port for testnet
  const rpc = new RPC({ clientConfig:{ host : '127.0.0.1:'+port } });

  
  const password = "cmd.password";
  const wallet = new Wallet(null, null, { network, rpc });
  const encryptedMnemonic = await wallet.export(password);
  console.log("mnemonic:", wallet.mnemonic);
  console.log("encrypted mnemonic:", encryptedMnemonic);
  const restore_wallet = await Wallet.import(password, encryptedMnemonic, { network, rpc })
}

module.exports = createWallet;
