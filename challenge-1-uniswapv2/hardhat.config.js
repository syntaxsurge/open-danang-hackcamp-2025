require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");

require("hardhat-resolc");
require("hardhat-revive-node");

require("dotenv").config();
console.log(process.env.LOCAL_PRIV_KEY);
console.log(process.env.AH_PRIV_KEY);
// require("hardhat-revive-node");
/** @type import('hardhat/config').HardhatUserConfig */
const config = {
  solidity: "0.8.19",
  resolc: {
        compilerSource: 'npm',
  },
  networks: {
    hardhat: {
      polkavm: true,
      nodeConfig: {
        nodeBinaryPath: './binaries/substrate-node',
        rpcPort: 8000,
        dev: true,
      },
      adapterConfig: {
        adapterBinaryPath: './binaries/eth-rpc',
        dev: true,
      },
    },
    polkavm: {
      polkavm: true,   
      url: 'http://127.0.0.1:8545',
      accounts: [process.env.LOCAL_PRIV_KEY, process.env.AH_PRIV_KEY],
    },

    ah: { 
      polkavm: true,
      url: "https://westend-asset-hub-eth-rpc.polkadot.io",
      accounts: [process.env.AH_PRIV_KEY],
    },
  },
};


// if (needsResolc) {
//   require("hardhat-resolc");
//   require("hardhat-revive-node");
//   // Standard JSON output
//   config.resolc = {
//     compilerSource: 'binary',
//     settings: {
//       optimizer: {
//         enabled: true,
//       },
//       evmVersion: 'istanbul',
//       compilerPath: '~/.cargo/bin/resolc-0.1.0-dev.14',
//       standardJson: true,
//     },
//   };
// }

module.exports = config;
