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

    wrappedXTZAddress = "0xB1Ea698633d57705e93b0E40c1077d46CD6A51d8";
    const capInUnits = ethers.utils.parseUnits("1000000000", 18); // 1 billion tokens with 18 decimals

    // Deploy LETZToken contract
    const LETZToken = await ethers.getContractFactory("LETZToken");
    const letzToken = await LETZToken.deploy(
        "LETZToken", 
        "LETZ", 
        capInUnits, // Cap
        1, // Rate
        30 * 24 * 60 * 60 * 3,// Lockup Duration (90 days in seconds)
        wrappedXTZAddress // Payment Token wXTZ
    );
    await letzToken.deployed();
    console.log("LETZToken deployed at:", letzToken.address);

    // Deploy Governance contract with LETZToken address
    const Governance = await ethers.getContractFactory("Governance");
    const governance = await Governance.deploy(letzToken.address);
    await governance.deployed();
    console.log("Governance deployed at:", governance.address);

    // Deploy Dividends contract with LETZToken address
    const Dividends = await ethers.getContractFactory("Dividends");
    const dividends = await Dividends.deploy(letzToken.address);
    await dividends.deployed();
    console.log("Dividends deployed at:", dividends.address);

    // Deploy AssetManagement contract with LETZToken address
    const custodianAddress = process.env.CUSTODIAN_ADDRESS;
    const AssetManagement = await ethers.getContractFactory("AssetManagement");
    const assetManagement = await AssetManagement.deploy(letzToken.address, custodianAddress);
    await assetManagement.deployed();
    console.log("AssetManagement deployed to:", assetManagement.address);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});