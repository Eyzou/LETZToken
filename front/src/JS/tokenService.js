import { ethers } from 'ethers';
import provider, {getProvider} from './ethersService'; // Use your existing provider setup

// The ERC-20 token contract ABI (simplified)
const erc20ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)"
];

// Replace this with your token contract address
const tokenAddress = '0x9c98Fed5A89a636665B54AfF06D47F2210A29a9C';

// Create the contract instance
const tokenContract = new ethers.Contract(tokenAddress, erc20ABI);

export async function getTokenBalance(address) {
    // Fetch token balance for the specified address
    const balance = await tokenContract.balanceOf(address)

    // Fetch token decimals to convert balance from smallest unit (like wei)
    const decimals = await tokenContract.decimals()

    // Convert balance from smallest unit to human-readable format
    return ethers.utils.formatUnits(balance, decimals);
}