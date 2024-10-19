// delegate the votes to be able to votes on behalf of another address
require('dotenv').config();
const { ethers } = require("ethers");
const LETZTokenABI = require("../../../artifacts/contracts/LETZToken.sol/LETZToken.json").abi;

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.LETZTOKEN_CONTRACT_ADDRESS;
const letzTokenContract = new ethers.Contract(contractAddress, LETZTokenABI, wallet);

async function delegateVotes(delegatee) {
    try {
        const tx = await letzTokenContract.delegate(delegatee);
        console.log("Transaction en cours :", tx.hash);
        
        // Wait for the transaction to be mined
        await tx.wait();
        console.log(`Votes delegated to ${delegatee}`);
    } catch (error) {
        console.error("Erreur lors de la délégation :", error);
    }
}

// Example usage
const delegatee = process.env.OWNER_ADRESS;; // Replace with the address you want to delegate to

if (!contractAddress || !process.env.RPC_URL || !process.env.PRIVATE_KEY) {
    console.error("Please ensure LETZTOKEN_CONTRACT_ADDRESS, RPC_URL, and PRIVATE_KEY are set in the .env file.");
    process.exit(1);
}

delegateVotes(delegatee);