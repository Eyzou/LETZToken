// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LETZToken.sol";

contract Dividends {

    mapping(address => uint256) public dividends;
    uint256 public totalDividends;

    event DividendsDistributed(uint256 amount);
    event DividendsWithdrawn(address indexed account, uint256 amount);

    LETZToken public letzToken;

    constructor(address letzTokenAddress) {
        letzToken = LETZToken(letzTokenAddress);
    }

    // Deposit dividends for distribution
    function depositDividends() external payable {
        require(msg.value > 0, "No Ether sent");
        totalDividends += msg.value;
        emit DividendsDistributed(msg.value);
    }

    // Withdraw dividends
    function withdrawDividends() external {
        uint256 owed = calculateDividends(msg.sender);
        require(owed > 0, "No dividends available");

        dividends[msg.sender] = 0;
        payable(msg.sender).transfer(owed);
        emit DividendsWithdrawn(msg.sender, owed);
    }

    // Calculate dividends
    function calculateDividends(address account) public view returns (uint256) {
        uint256 totalSupply = letzToken.totalSupply();
        if (totalSupply == 0) return 0;
        uint256 holderShare = (letzToken.balanceOf(account) * totalDividends) / totalSupply;
        return holderShare - dividends[account];
    }
}
