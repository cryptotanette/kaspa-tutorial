const rpcClient = require("./utils/rpc-client");
const createWallet = require("./utils/wallet");

(async ()=> {
  await createWallet();
  await rpcClient();
})();