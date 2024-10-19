require('dotenv').config();
const { ethers } = require("ethers");
const GovernanceABI = require("../../../artifacts/contracts/Governance.sol/Governance.json").abi;

// Configurez le fournisseur et le portefeuille
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.GOVERNANCE_CONTRACT_ADDRESS;

async function voteOnProposal(proposalId, support) {
    const governanceContract = new ethers.Contract(contractAddress, GovernanceABI, wallet);

    try {
        const tx = await governanceContract.voteOnProposal(proposalId, support);
        console.log("Transaction en cours :", tx.hash);
        
        // Attendre que la transaction soit minée
        await tx.wait();
        console.log(`Vote enregistré pour la proposition ${proposalId} !`);
    } catch (error) {
        console.error("Erreur lors du vote :", error);
    }
}

// Exemple d'utilisation
const proposalId = 1; // Remplacez par l'ID de la proposition sur laquelle vous voulez voter
const support = true; 
voteOnProposal(proposalId, support);
