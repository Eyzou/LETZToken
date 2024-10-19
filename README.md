# LETZToken

**Objective:**

LETZToken is a set of smart contracts designed to tokenize real-world assets (RWA), manage dividends, and enable decentralized governance for token holders. This README guides you through setting up the development environment, deploying the smart contracts, and interacting with them.

---

## Installation and Setup

### 1. Install Dependencies

Ensure you have installed the following dependencies, packages, and libraries:

- **Hardhat** (development environment)
- **dotenv** (environment variable management)
- **ethers** (Ethereum JavaScript library)
- **node**

To install the necessary contracts, run the following commands:

```bash
npm install @openzeppelin/contracts
npm install @chainlink/contracts
```

### 2. Fund Your Etherlink Wallet

To deploy the smart contracts, ensure your wallet is funded with Ether from the Etherlink faucet:
[Faucet Link](https://faucet.etherlink.com/)

### 3. Update the .env File

Update the following fields in your .env file with the appropriate values:

```bash
PRIVATE_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CUSTODIAN_ADDRESS=0x0000000000000000000000000000000000000000
OWNER_ADDRESS=0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
RPC_URL=https://node.ghostnet.etherlink.com
PAYMENTTOKEN_CONTRACT_ADDRESS=0xB1Ea698633d57705e93b0E40c1077d46CD6A51d8
```

### 4. Deploy the Smart Contract

Run the following command to deploy your smart contract:

```bash
npx hardhat run scripts/deploy.js --network etherlink
```

### 5. Verify the Deployment

After deployment, the script will output the contract address. Verify your contract on the Etherlink testnet explorer:
[Testnet Explorer](https://testnet.explorer.etherlink.com/)

### 6. Add the Token to Your Wallet

To interact with the token in your wallet (e.g., MetaMask), manually add it as a custom token using the contract address provided after deployment.

### 7. Interact with the Smart Contract

Run the following command to interact with the deployed smart contract:

```bash
npx hardhat run scripts/interact/XXXXX.js --network etherlink
```

NB: if you want to use the buyToken function you need first to be whitelisted by the OWNER of the Contract via the function addWhitlistadress.

## Smart Contract functionnalities

### 1. LETZToken (Core ERC20 Token Contract)

This contract handles the core ERC20 functionality with additional features such as:

    Voting extensions
    Permissioned addresses
    Token creation
    Crowdsale management
    Whitelisted address management

### 2. AssetManagement (Real World Asset Management)

This contract manages the tokenization and verification of real-world assets (RWA):

    Custodian verification for assets
    Chainlink oracles for price feeds
    Valuation updates and asset management

### 3. Dividends (Dividend Management)

This contract handles dividend distribution, including:

    Deposit of dividends by the token issuer
    Calculation of dividends for token holders
    Withdrawal of dividends by token holders

### 4. Governance (DAO and Proposals)

This contract manages decentralized governance:

    Proposal creation
    Voting by token holders
    Execution of governance decisions
