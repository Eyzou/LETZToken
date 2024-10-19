import { ethers } from 'ethers';

let provider;

export function initializeProvider()
{
    if (window.ethereum) {
        // Modern dapp browsers with MetaMask or similar
        provider = new ethers.BrowserProvider(window.ethereum);

        window.ethereum.request({ method: 'eth_requestAccounts' }).catch((error) => {
            console.error('User denied account access', error);
        });
        console.log("Logged");
    } else {
        alert("Please download metamask extension");
        // Fallback to a default provider if no wallet is available
    }
}

export function getProvider() {
    if (!provider) {
        initializeProvider();
    }
    return provider;
}

export default provider;
