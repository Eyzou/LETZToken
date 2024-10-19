require('dotenv').config();
const { ethers } = require("ethers");
const { BigNumber } = require("ethers");
const LETZTokenABI = require("../../artifacts/contracts/LETZToken.sol/LETZToken.json").abi;
const IERC20ABI = require("../../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json").abi;

async function buyTokens(contractAddress, paymentTokenAddress, signer, amount) {

    if (!ethers.utils.isAddress(contractAddress)) {
        throw new Error(`Invalid LETZToken contract address: ${contractAddress}`);
    }
    if (!ethers.utils.isAddress(paymentTokenAddress)) {
        throw new Error(`Invalid payment token address: ${paymentTokenAddress}`);
    }

    const letzTokenContract = new ethers.Contract(contractAddress, LETZTokenABI, signer);
    const paymentTokenContract = new ethers.Contract(paymentTokenAddress, IERC20ABI, signer);

    try {
        console.log(`Approving ${amount} wXTZ to be spent by LETZToken contract...`);

        // Approve the LETZToken contract to spend the payment token
        const approveGasEstimate = await paymentTokenContract.estimateGas.approve(contractAddress, amount);
        
        const approveTx = await paymentTokenContract.approve(contractAddress, amount);
        await approveTx.wait();
        console.log(`Approved ${amount} wXTZ`);

        console.log(`Buying tokens with ${amount} wXTZ...`);

        const buyGasEstimate = await letzTokenContract.estimateGas.buyTokens(amount);
        console.log(`Estimated gas for approve: ${approveGasEstimate.toString()}`);
        // Call the buyTokens function on the LETZToken contract
        const buyTx = await letzTokenContract.buyTokens(amount);
        await buyTx.wait();
        console.log(`Bought tokens with ${amount} wXTZ`);
    } catch (error) {
        console.error("Error buying tokens:", error);
    }
}

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contractAddress = process.env.LETZTOKEN_CONTRACT_ADDRESS;
    const paymentTokenAddress = process.env.PAYMENTTOKEN_CONTRACT_ADDRESS; // Address of the wXTZ token
    const amount = "1000000000000000000";
    //const amount = ethers.utils.parseUnits(input);

    await buyTokens(contractAddress, paymentTokenAddress, signer, amount);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});