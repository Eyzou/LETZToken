require('dotenv').config();
const { ethers } = require("ethers");
const GovernanceABI = require("../../../artifacts/contracts/Governance.sol/Governance.json").abi;
const LETZTokenABI = require("../../../artifacts/contracts/LETZToken.sol/LETZToken.json").abi;

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.GOVERNANCE_CONTRACT_ADDRESS;
const contractAddress2 = process.env.LETZTOKEN_CONTRACT_ADDRESS;
const governanceContract = new ethers.Contract(contractAddress, GovernanceABI, wallet);
const contract = new ethers.Contract(contractAddress2, LETZTokenABI, wallet);

async function checkVotingEligibility(address) {
    try {
        const canVote = await governanceContract.canVote({ from: address });
        console.log(`Address ${address} can vote: ${canVote}`);
        const votingPower = await contract.getVotes(address);
        console.log(`Voting power of ${address}: ${votingPower.toString()}`);
    } catch (error) {
        console.error("Error checking voting eligibility:", error);
    }
}

// Example usage
const address = "0x653057837980FD3A12652A5FcDa23c76e4892247"; // Replace with the address you want to check

if (!contractAddress || !process.env.RPC_URL || !process.env.PRIVATE_KEY) {
    console.error("Please ensure LETZTOKEN_CONTRACT_ADDRESS, RPC_URL, and PRIVATE_KEY are set in the .env file.");
    process.exit(1);
}

checkVotingEligibility(address);