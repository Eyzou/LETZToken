//require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity:{
    compilers: [
      {
        version: "0.8.27",
      },
      {
        version: "0.8.20",
      },
    ],
  },
  networks: {
    hardhat: {
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    etherlink: {
      allowUnlimitedContractSize: true,
      url: `https://node.ghostnet.etherlink.com`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
  }
};
