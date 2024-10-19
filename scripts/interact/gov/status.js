require('dotenv').config();
const { ethers } = require("ethers");
const GovernanceABI = require("../../../artifacts/contracts/Governance.sol/Governance.json").abi;

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.GOVERNANCE_CONTRACT_ADDRESS;

async function getProposalStatus(proposalId) {
    const governanceContract = new ethers.Contract(contractAddress, GovernanceABI, wallet);

    try {
        const proposal = await governanceContract.proposals(proposalId);
        console.log(`Proposition ID: ${proposalId}`);
        console.log(`Description: ${proposal.description}`);
        console.log(`Votes pour: ${proposal.votesFor.toString()}`);
        console.log(`Votes contre: ${proposal.votesAgainst.toString()}`);
        console.log(`Exécutée: ${proposal.executed}`);
    } catch (error) {
        console.error("Erreur lors de la récupération du statut de la proposition :", error);
    }
}

const proposalId = 1; // Remplacez par l'ID de la proposition que vous voulez vérifier
getProposalStatus(proposalId);