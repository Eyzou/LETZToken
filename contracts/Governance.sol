// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/governance/utils/IVotes.sol";
//import "./LETZToken.sol";

contract Governance is Ownable {
    
    IVotes public letzToken;

    constructor(address letzTokenAddress) Ownable(){
        letzToken = IVotes(letzTokenAddress);
    }

    struct Proposal {
        address proposer;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
        mapping(address => bool) hasVoted; // Track if an address has voted
    }

    mapping(uint256 => Proposal) public proposals; //stored proposals with unique IDs.
    uint256 public proposalCount;

    event ProposalCreated(uint256 proposalId, address proposer, string description);
    event VoteCast(address voter, uint256 proposalId, bool support);

    //Allow user to make a proposal.
    function createProposal(string memory description) external returns (uint256) {
        proposalCount++;
        Proposal storage proposal = proposals[proposalCount];
        proposal.proposer = msg.sender;
        proposal.description = description;
        proposal.votesFor = 0;
        proposal.votesAgainst = 0;
        proposal.executed = false;
        emit ProposalCreated(proposalCount, msg.sender, description);
        return proposalCount;
    }

    function canVote(address voter) public view returns (bool) {
        uint256 weight = letzToken.getVotes(voter);
        return weight > 0;
    }

    // Once created anyone can vote / proposal ID and Yes or No
    function voteOnProposal(uint256 proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(!proposal.hasVoted[msg.sender], "Address has already voted"); // Ensure one vote per address

        proposal.hasVoted[msg.sender] = true; // Mark the address as having voted

        if (support) {
            proposal.votesFor += 1;
        } else {
            proposal.votesAgainst += 1;
        }

        emit VoteCast(msg.sender, proposalId, support);
    }

    function executeProposal(uint256 proposalId) external onlyOwner {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");

        if (proposal.votesFor > proposal.votesAgainst) {
            proposal.executed = true;
            // Logic to execute the proposal  // investment choice or distribution..
        }
    }
}
