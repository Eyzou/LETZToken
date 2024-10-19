require('dotenv').config();
const { ethers } = require("ethers");
const fs = require('fs');
const path = require('path');
const LETZTokenABI = require("../../artifacts/contracts/LETZToken.sol/LETZToken.json").abi;

async function remainingTokens(contractAddress, signer) {
    const contract = new ethers.Contract(contractAddress, LETZTokenABI, signer);

    try {
        const remaining = await contract.remainingTokens();
        console.log(`Remaining tokens: ${remaining.toString()}`);
      } catch (error) {
        console.error("Error fetching remaining tokens:", error);
        console.error("Transaction details:", error.transaction);
        console.error("Method called:", error.method);
      }
}

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contractAddress = process.env.LETZTOKEN_CONTRACT_ADDRESS;

    await remainingTokens(contractAddress, signer);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});