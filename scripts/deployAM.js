require('dotenv').config();
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());

    if (balance.eq(0)) {
        throw new Error("Account balance is 0. Please fund your account.");
    }

    const letzTokenAddress = process.env.LETZTOKEN_CONTRACT_ADDRESS;
    if (!ethers.utils.isAddress(letzTokenAddress)) {
        throw new Error(`Invalid LETZToken contract address: ${letzTokenAddress}`);
    }

    // Deploy AssetManagement contract with LETZToken address
    const custodianAddress = process.env.CUSTODIAN_ADDRESS;
    if (!ethers.utils.isAddress(custodianAddress)) {
        throw new Error(`Invalid custodian address: ${custodianAddress}`);
    }

    //const AssetManagement = await ethers.getContractFactory("AssetManagement");
    //const assetManagement = await AssetManagement.deploy(letzTokenAddress, custodianAddress);
    //await assetManagement.deployed();
    //console.log("AssetManagement deployed to:", assetManagement.address);

    // Deploy Governance contract with LETZToken address
    const Governance = await ethers.getContractFactory("Governance");
    const governance = await Governance.deploy(letzTokenAddress);
    await governance.deployed();
    console.log("Governance deployed at:", governance.address);
    
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});