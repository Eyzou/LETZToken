require('dotenv').config();
const { ethers } = require("ethers");
const LETZTokenABI = require("../../artifacts/contracts/LETZToken.sol/LETZToken.json").abi;

async function mintTokens(contractAddress, provider, signer, to, amount) {
    const contract = new ethers.Contract(contractAddress, LETZTokenABI, signer);

    try {
        const tx = await contract.mintToken(to, amount);
        await tx.wait();
        console.log(`Minted ${amount} tokens to ${to}.`);
    } catch (error) {
        console.error("Error minting tokens:", error);
    }
}

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contractAddress = process.env.LETZTOKEN_CONTRACT_ADDRESS;
    const to = process.env.OWNER_ADRESS;
    const amount = ethers.utils.parseEther(process.env.MINT_AMOUNT);

    await mintTokens(contractAddress, provider, signer, to, amount);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
