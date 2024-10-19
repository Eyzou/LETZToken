require('dotenv').config();
const { ethers } = require("ethers");
const LETZTokenABI = require("../../artifacts/contracts/LETZToken.sol/LETZToken.json").abi;

async function checkWhitelistedAddresses(contractAddress, signer, addresses) {
    const contract = new ethers.Contract(contractAddress, LETZTokenABI, signer);
    const whitelistedStatuses = {};

    try {
        // Check if each address is whitelisted using the public mapping
        for (const address of addresses) {
            const isWhitelisted = await contract.whitelisted(address);
            whitelistedStatuses[address] = isWhitelisted;
        }

        console.log("Whitelisted Addresses:", whitelistedStatuses);
    } catch (error) {
        console.error("Error checking whitelisted addresses:", error);
    }
}

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contractAddress = process.env.LETZTOKEN_CONTRACT_ADDRESS;
    const addresses = [
        process.env.ELIOT_ADDRESS,
        process.env.OWNER_ADRESS,
    ];

    await checkWhitelistedAddresses(contractAddress, signer, addresses);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});