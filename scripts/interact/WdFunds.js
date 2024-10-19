require('dotenv').config();
const { ethers } = require("ethers");
const fs = require('fs');
const path = require('path');
const LETZTokenABI = require("../../artifacts/contracts/LETZToken.sol/LETZToken.json").abi;

async function withdrawFunds(contractAddress, signer,amount ) {
    const contract = new ethers.Contract(contractAddress, LETZTokenABI, signer);

    try {
        const tx = await contract.withdrawFunds(amount);
        await tx.wait();
        console.log(`Withdrawn ${(amount)} wXTZ from the contract.`);
    } catch (error) {
        console.error("Error withdrawing funds:", error);
        if (error.error) {
            console.error("Error message:", error.error.message);
        }
    }
}

// Example usage
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.LETZTOKEN_CONTRACT_ADDRESS;
const amount = "1000000000000000000";

if (!contractAddress || !process.env.RPC_URL || !process.env.PRIVATE_KEY) {
    console.error("Please ensure LETZTOKEN_CONTRACT_ADDRESS, RPC_URL, and PRIVATE_KEY are set in the .env file.");
    process.exit(1);
}

withdrawFunds(contractAddress, wallet, amount);