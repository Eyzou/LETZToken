require('dotenv').config();
const { ethers } = require("ethers");
const LETZTokenABI = require("../../artifacts/contracts/LETZToken.sol/LETZToken.json").abi;

async function main() {
    // Ensure environment variables are set
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contractAddress = process.env.LETZTOKEN_CONTRACT_ADDRESS;

    if (!contractAddress || !process.env.RPC_URL || !process.env.PRIVATE_KEY) {
        console.error("Please ensure LETZTOKEN_CONTRACT_ADDRESS, RPC_URL, and PRIVATE_KEY are set in the .env file.");
        process.exit(1);
    }

    // Create contract instance
    const LETZToken = new ethers.Contract(contractAddress, LETZTokenABI, wallet);

    // Get balance
    const balance = await LETZToken.balanceOf(wallet.address);

    console.log(`Balance of ${wallet.address}: ${ethers.utils.formatEther(balance)} LETZ`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});