import {acceptHMRUpdate, defineStore} from "pinia";
import {computed, ref, shallowRef} from "vue";
import {ethers, formatEther} from "ethers";
import abi from './default.json';
import abiERC from './defaultERC.json';
import {getTokenBalance} from "@/JS/tokenService.js";
import {useRouter} from "vue-router";
import governanceABI from "@/stores/governance.json";

export const useUser = defineStore("user", () => {
    const user = ref(null);
    const provider = shallowRef(null);
    const state = ref("");
    const tezos = ref(null)
    const signer = ref(null)
    const token = ref(null);
    const isAuth = computed(() => user.value !== null)
    const initializeProvider = async () => {
        if (window.ethereum) {
            // Modern dapp browsers with MetaMask or similar
            try {
                let _provider = new ethers.BrowserProvider(window.ethereum);
                await window.ethereum.request({method: 'eth_requestAccounts'});
                provider.value = _provider;
                signer.value = await provider.value.getSigner();
                user.value = await signer.value.getAddress()
                await setTokenAmount();
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("Please download metamask extension");
            // Fallback to a default provider if no wallet is available
        }
    }
    const initializeMetamaskHook = () => {
        if (window.ethereum) {
            // Detect network disconnection
            window.ethereum.on('disconnect', (error) => {
                console.log('MetaMask disconnected:', error);
            });
            // Detect account changes
            window.ethereum.on('accountsChanged', async (accounts) => {
                if (accounts.length === 0) {
                    user.value = null;
                    provider.value = null;
                    signer.value = null;
                    token.value = 0;
                    user.value = null;
                } else {
                    user.value = accounts[0];
                    await setTokenAmount()
                }
            });
            // Detect chain/network changes
            window.ethereum.on('chainChanged', (chainId) => {
                // console.log('Network changed to:', chainId);
                // You might want to reload or refresh some data when the network changes
                window.location.reload();
            });
        }
    }
    const setAddress = (address) => {
        user.value = address;
    }
    const setTokenAmount = async () => {
        try {
            const tokenContract = "0x0f9327032CE73F97588241e17886c3E7664116A3";
            const tezosTokenContract = "0xB1Ea698633d57705e93b0E40c1077d46CD6A51d8";

            const contract = new ethers.Contract(tokenContract, abi, provider.value);
            const balance = await contract.balanceOf(user.value);
            token.value = ethers.formatUnits(balance, 18);

            const tezosContract = new ethers.Contract(tezosTokenContract, abiERC, provider.value);
            const tezosBalance = await tezosContract.balanceOf(user.value);
            tezos.value = ethers.formatUnits(tezosBalance, 18);
        } catch (e) {
            console.error(e)
        }
    }

    const buyToken = async (amount, router) => {
        if (!isAuth && amount > 0 && router)
            return;
        try {
            // Parse the amount into wei (smallest unit)

            state.value = "Confirm"

            router.push("/Pending");
            const _amount = ethers.parseUnits(amount.toString(), 18);  // Assuming 'amount' is in ether units

            const paymentTokenAddress = "0xB1Ea698633d57705e93b0E40c1077d46CD6A51d8";
            const tokenContract = "0x0f9327032CE73F97588241e17886c3E7664116A3";

            const _provider = new ethers.BrowserProvider(window.ethereum);  // Initialize the provider
            const _signer = await _provider.getSigner();

            // Send the transaction with value (ether) and pass _amount as the function argument
            const paymentTokenContract = new ethers.Contract(paymentTokenAddress, abiERC, _signer);
            const contract = new ethers.Contract(tokenContract, abi, _signer);
            const approval = await paymentTokenContract.approve(tokenContract, _amount);
            state.value = "Pending"
            await approval.wait();

            state.value = "Confirm"
            const result = await contract.buyTokens(_amount);

            state.value = "Pending"
            const receipt = await result.wait();
            await setTokenAmount()
            state.value = "Completed"
        } catch (e) {
            // console.error("Error during token purchase:", e);
            state.value = "Error"
        }
    };


    const setToken = (token) => {
        token.value = token;
    }
    return {
        user,
        provider,
        state,
        tezos,
        signer,
        token,
        isAuth,
        setAddress,
        setToken,
        setTokenAmount,
        initializeProvider,
        initializeMetamaskHook,
        buyToken,
    }
}, {
    persist: {
        storage: sessionStorage
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))