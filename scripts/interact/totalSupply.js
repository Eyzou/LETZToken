require('dotenv').config();
const { ethers } = require("ethers");
const LETZTokenABI = require("../../artifacts/contracts/LETZToken.sol/LETZToken.json").abi;

async function totalSupply(contractAddress, signer) {
    const contract = new ethers.Contract(contractAddress, LETZTokenABI, signer);

    try {
        const supply = await contract.totalSupply();
        console.log(`Total supply: ${ethers.utils.formatEther(supply)}`);
    } catch (error) {
        console.error("Error fetching total supply:", error);
    }
}

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contractAddress = process.env.LETZTOKEN_CONTRACT_ADDRESS;

    await totalSupply(contractAddress, signer);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});