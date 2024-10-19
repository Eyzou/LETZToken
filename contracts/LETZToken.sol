// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Governance.sol";
import "./AssetManagement.sol";
import "./Dividends.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LETZToken is ERC20, ERC20Permit, ERC20Votes, Ownable {
    uint256 public rate; // Conversion rate 1
    uint256 public cap; // Maximum number of tokens that can be minted
    uint256 public totalRaised; // tracking of total funds raised
    uint256 public lockupEndTime; // end of investment period
    
    IERC20 public paymentToken; // Token used for payment
    mapping(address => bool) public whitelisted;

    // events/signals stored in blockchain for external applications to listen to (gas-efficient)
    event WhitelistedAddressAdded(address indexed account);
    event WhitelistedAddressRemoved(address indexed account);
    event TokensPurchased(address buyer, uint256 amount);
    event TokensMinted(address indexed to, uint256 amount, uint256 totalRaised);

    constructor(
        string memory name,
        string memory symbol,
        uint256 _cap,
        uint256 _rate,
        uint256 lockupDuration, // investment period
        address _paymentToken // address of the ERC20 token used for payment
    )
        ERC20(name, symbol)
        ERC20Votes()
        ERC20Permit(name)    
        Ownable()
    {
        rate = _rate;
        cap = _cap;
        lockupEndTime = block.timestamp + lockupDuration;
        paymentToken = IERC20(_paymentToken);
    }

    // Mint tokens (called by the owner)
    function mintToken(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= cap, "Cap exceeded");
        _mint(to, amount);
        emit TokensMinted(to, amount, totalRaised);
    }
    
    
    function remainingTokens() public view returns (uint256) {
        uint256 totalSupply = totalSupply();
        require(cap >= totalSupply, "Cap must be greater than or equal to total supply");
        return cap - totalSupply;
    }

    // Whitelist functions
    function addAddressToWhitelist(address account) external onlyOwner {
        whitelisted[account] = true;
        emit WhitelistedAddressAdded(account);
    }

    function removeAddressFromWhitelist(address account) external onlyOwner {
        whitelisted[account] = false;
        emit WhitelistedAddressRemoved(account);
    }

    // Token purchase function
    function buyTokens(uint256 numUnits) public  {
        require(whitelisted[msg.sender], "Address not whitelisted");
        uint256 numTokens = numUnits * rate;
        require(totalSupply() + numTokens <= cap, "Cap exceeded");

        // Transfer payment tokens from the buyer to the contract
        require(IERC20(paymentToken).transferFrom(msg.sender, address(this), numUnits), "Payment failed");

        _mint(msg.sender, numUnits);
        emit TokensPurchased(msg.sender, numUnits);
    }

    // Withdraw raised funds by the contract owner
 function withdrawFunds(uint256 amount) external onlyOwner {
        uint256 balance = paymentToken.balanceOf(address(this));
        require(balance > 0, "No funds to withdraw"); // unpredictable behavior when balance is 0
        require(amount > 0, "Amount must be greater than 0");
        require(amount <= balance, "Insufficient funds to withdraw");
        require(paymentToken.transfer(owner(), amount), "Transfer failed");
 }


    //Overrides required by Solidity for ERC20 and ERC20Votes

    function _afterTokenTransfer(address from, address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }
    
    function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);  // Call the `super` function from ERC20
    }

    function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);  // Call the `super` function from ERC20
    }

    function nonces(address owner) public view override(ERC20Permit) returns (uint256) {
        return super.nonces(owner);
    }

}
