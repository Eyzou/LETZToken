import { ethers } from 'ethers';
import provider from './ethersService.js';

const contractABI = [
    // Your contract ABI goes here
];
const contractAddress = '0xF73A14A386179D25e052536259B6954B0209C10c';

const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractABI, signer);

export default contract;