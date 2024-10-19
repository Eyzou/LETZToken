require('dotenv').config();
const { ethers } = require("ethers");
const LETZTokenABI = require("../../artifacts/contracts/LETZToken.sol/LETZToken.json").abi;

async function addAddressToWhitelist(contractAddress, signer, to) {
    const contract = new ethers.Contract(contractAddress, LETZTokenABI, signer);

    try {
        if (typeof contract.addAddressToWhitelist !== 'function') {
            throw new Error("Function addAddressToWhitelist not found in contract ABI");
        }

        const tx = await contract.addAddressToWhitelist(to);
        await tx.wait();
        console.log(`Added ${to} to the whitelist.`);

        // Print the whitelisted address
    } catch (error) {
        console.error("Error adding address to whitelist:", error);
    }
}

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contractAddress = process.env.LETZTOKEN_CONTRACT_ADDRESS;
    const to = process.env.OWNER_ADRESS;

    await addAddressToWhitelist(contractAddress, signer, to);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});