// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./LETZToken.sol";

// define interface for asset custodian to interact with (API of the custodian)
interface IAssetCustodian {
    function getAssetData(uint256 assetId) external view returns (string memory);
} 

contract AssetManagement is Ownable {

    LETZToken public letzToken;

    constructor(address letzTokenAddress, address custodianAddress) Ownable() {
        letzToken = LETZToken(letzTokenAddress);
        custodian = IAssetCustodian(custodianAddress);
    }
    
    struct Asset {
        string assetName; // asset name
        uint256 assetId; // unique asset identifier (ISIN or other)
        string assetData; // metadata from custodian
        bool useChainlink; // use Chainlink price feed or manual valuation
        address priceFeed; // Chainlink price feed address
        uint256 manualValuation; // manual valuation
        bool verified; // asset verified by owner
    }

    mapping(uint256 => Asset) public assets;
    IAssetCustodian public custodian;
    uint256 public currentValuation;
    uint256 public liabilities;
    uint256 public assetCount;

    // EXISTENCE OF ASSET
    event AssetVerified(uint256 assetId, string assetName);
    // VALUATION OF ASSET
    event ValuationUpdated(uint256 newValuation);

    // Add an asset
    function addAsset(uint256 assetId, string memory assetName, bool useChainlink, address priceFeed, uint256 manualValuation) public onlyOwner {
        assets[assetId] = Asset(assetName, assetId, "custodian data", useChainlink, priceFeed, manualValuation, false);
        assetCount++;
    }

    //function to verify asset only can be called by custodian
    function verifyAsset(uint256 assetId) public {
        require(msg.sender == address(custodian), "Only the custodian can verify assets");
        assets[assetId].verified = true;
        emit AssetVerified(assetId, assets[assetId].assetData);
    }

    // Get latest asset price using Chainlink or manual valuation
    function getLatestPrice(uint256 assetId) internal view returns (uint256) {
        Asset storage asset = assets[assetId];
        if (asset.useChainlink) {
            AggregatorV3Interface priceFeed = AggregatorV3Interface(asset.priceFeed);
            (, int256 price, , ,) = priceFeed.latestRoundData();
            require(price > 0, "Price must be positive");
            return uint256(price);
        } else {
            require(asset.manualValuation > 0, "Manual price must be positive");
            return asset.manualValuation;
        }
    }

    // Update valuation
    function updateValuation() external onlyOwner {
        uint256 totalValue = 0;
        for (uint256 i = 0; i < assetCount; i++) {
            Asset storage asset = assets[i];
            if (asset.verified) {
                totalValue += getLatestPrice(asset.assetId);
            }
        }
        totalValue = totalValue - liabilities; // depends if you have the whole NAV already or only the Valuation.
        currentValuation = totalValue;
        emit ValuationUpdated(currentValuation);
    }

    // Fetch asset data from custodian
    function fetchAssetData(uint256 assetId) public view returns (string memory) {
        return custodian.getAssetData(assetId);
    }
    // Set liabilities for manual valuation
    function setLiabilities(uint256 _liabilities) external onlyOwner {
        liabilities = _liabilities;
    }
}
