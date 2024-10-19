require('dotenv').config();
const { ethers } = require("ethers");
const GovernanceABI = require("../../../artifacts/contracts/Governance.sol/Governance.json").abi;

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.GOVERNANCE_CONTRACT_ADDRESS;

async function createProposal(description) {
    const governanceContract = new ethers.Contract(contractAddress, GovernanceABI, wallet);

    try {
        const tx = await governanceContract.createProposal(description);
        console.log("Transaction en cours :", tx.hash);
        
        await tx.wait();
        console.log("Proposition créée avec succès !");
    } catch (error) {
        console.error("Erreur lors de la création de la proposition :", error);
    }
}

// Exemple d'utilisation
createProposal("Increase distributions by 10%");
