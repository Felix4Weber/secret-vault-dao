// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint64, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SecretVaultDAO is SepoliaConfig, Ownable, ReentrancyGuard {
    using FHE for *;
    
    struct TreasuryProposal {
        euint32 proposalId;
        euint32 amount;
        euint32 votesFor;
        euint32 votesAgainst;
        ebool isActive;
        ebool isExecuted;
        string description;
        address proposer;
        uint256 deadline;
        uint256 createdAt;
    }
    
    struct MemberVote {
        euint32 proposalId;
        ebool vote; // true for yes, false for no
        address voter;
        uint256 timestamp;
    }
    
    struct TreasuryAllocation {
        euint32 allocationId;
        euint32 amount;
        ebool isActive;
        string purpose;
        address recipient;
        uint256 createdAt;
    }
    
    struct MemberReputation {
        euint32 reputation;
        euint32 votingPower;
        ebool isActive;
        address member;
        uint256 joinedAt;
    }
    
    // State variables
    mapping(uint256 => TreasuryProposal) public proposals;
    mapping(uint256 => MemberVote) public votes;
    mapping(uint256 => TreasuryAllocation) public allocations;
    mapping(address => MemberReputation) public members;
    mapping(address => euint32) public memberBalances;
    
    uint256 public proposalCounter;
    uint256 public voteCounter;
    uint256 public allocationCounter;
    uint256 public totalTreasury;
    
    address public verifier;
    uint256 public votingPeriod = 7 days;
    uint256 public quorumThreshold = 30; // 30% of members must vote
    
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string description);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool vote);
    event ProposalExecuted(uint256 indexed proposalId, bool success);
    event TreasuryAllocated(uint256 indexed allocationId, address indexed recipient, uint32 amount);
    event MemberJoined(address indexed member, uint32 reputation);
    event ReputationUpdated(address indexed member, uint32 newReputation);
    
    constructor(address _verifier) Ownable(msg.sender) {
        verifier = _verifier;
    }
    
    function createProposal(
        string memory _description,
        externalEuint32 _amount,
        bytes calldata _inputProof
    ) public returns (uint256) {
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(members[msg.sender].isActive.decrypt(), "Only active members can create proposals");
        
        uint256 proposalId = proposalCounter++;
        
        proposals[proposalId] = TreasuryProposal({
            proposalId: FHE.asEuint32(0), // Will be set via FHE operations
            amount: _amount,
            votesFor: FHE.asEuint32(0),
            votesAgainst: FHE.asEuint32(0),
            isActive: FHE.asEbool(true),
            isExecuted: FHE.asEbool(false),
            description: _description,
            proposer: msg.sender,
            deadline: block.timestamp + votingPeriod,
            createdAt: block.timestamp
        });
        
        emit ProposalCreated(proposalId, msg.sender, _description);
        return proposalId;
    }
    
    function castVote(
        uint256 _proposalId,
        externalEbool _vote,
        bytes calldata _inputProof
    ) public {
        require(members[msg.sender].isActive.decrypt(), "Only active members can vote");
        require(proposals[_proposalId].deadline > block.timestamp, "Voting period has ended");
        require(!proposals[_proposalId].isExecuted.decrypt(), "Proposal already executed");
        
        // Check if member has already voted
        // This would require additional FHE operations to check encrypted vote history
        
        uint256 voteId = voteCounter++;
        votes[voteId] = MemberVote({
            proposalId: FHE.asEuint32(_proposalId),
            vote: _vote,
            voter: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update vote counts using FHE operations
        if (_vote.decrypt()) {
            proposals[_proposalId].votesFor = proposals[_proposalId].votesFor.add(FHE.asEuint32(1));
        } else {
            proposals[_proposalId].votesAgainst = proposals[_proposalId].votesAgainst.add(FHE.asEuint32(1));
        }
        
        emit VoteCast(_proposalId, msg.sender, _vote.decrypt());
    }
    
    function executeProposal(uint256 _proposalId) public nonReentrant {
        require(proposals[_proposalId].deadline < block.timestamp, "Voting period not ended");
        require(!proposals[_proposalId].isExecuted.decrypt(), "Proposal already executed");
        
        // Check if proposal passed using FHE operations
        euint32 totalVotes = proposals[_proposalId].votesFor.add(proposals[_proposalId].votesAgainst);
        euint32 requiredVotes = FHE.asEuint32(uint32((totalTreasury * quorumThreshold) / 100));
        
        ebool proposalPassed = proposals[_proposalId].votesFor.gt(proposals[_proposalId].votesAgainst);
        ebool quorumMet = totalVotes.gt(requiredVotes);
        
        ebool canExecute = proposalPassed.and(quorumMet);
        
        if (canExecute.decrypt()) {
            proposals[_proposalId].isExecuted = FHE.asEbool(true);
            
            // Execute the proposal (allocate funds)
            uint256 allocationId = allocationCounter++;
            allocations[allocationId] = TreasuryAllocation({
                allocationId: FHE.asEuint32(allocationId),
                amount: proposals[_proposalId].amount,
                isActive: FHE.asEbool(true),
                purpose: proposals[_proposalId].description,
                recipient: proposals[_proposalId].proposer,
                createdAt: block.timestamp
            });
            
            emit ProposalExecuted(_proposalId, true);
            emit TreasuryAllocated(allocationId, proposals[_proposalId].proposer, proposals[_proposalId].amount.decrypt());
        } else {
            proposals[_proposalId].isActive = FHE.asEbool(false);
            emit ProposalExecuted(_proposalId, false);
        }
    }
    
    function joinDAO() public {
        require(!members[msg.sender].isActive.decrypt(), "Already a member");
        
        members[msg.sender] = MemberReputation({
            reputation: FHE.asEuint32(100), // Initial reputation
            votingPower: FHE.asEuint32(1), // Initial voting power
            isActive: FHE.asEbool(true),
            member: msg.sender,
            joinedAt: block.timestamp
        });
        
        emit MemberJoined(msg.sender, 100);
    }
    
    function updateReputation(
        address _member,
        externalEuint32 _newReputation,
        bytes calldata _inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(members[_member].isActive.decrypt(), "Member not active");
        
        members[_member].reputation = _newReputation;
        
        // Update voting power based on reputation
        if (_newReputation.decrypt() >= 500) {
            members[_member].votingPower = FHE.asEuint32(2);
        } else if (_newReputation.decrypt() >= 1000) {
            members[_member].votingPower = FHE.asEuint32(3);
        }
        
        emit ReputationUpdated(_member, _newReputation.decrypt());
    }
    
    function depositToTreasury() public payable {
        require(msg.value > 0, "Must deposit positive amount");
        totalTreasury += msg.value;
    }
    
    function allocateTreasuryFunds(
        uint256 _allocationId,
        externalEuint32 _amount,
        bytes calldata _inputProof
    ) public {
        require(members[msg.sender].isActive.decrypt(), "Only active members can allocate");
        require(allocations[_allocationId].isActive.decrypt(), "Allocation not active");
        
        // FHE operation to verify allocation amount
        euint32 encryptedAmount = _amount;
        euint32 maxAllocation = FHE.asEuint32(uint32(totalTreasury / 10)); // Max 10% per allocation
        
        ebool canAllocate = encryptedAmount.lte(maxAllocation);
        require(canAllocate.decrypt(), "Allocation amount exceeds limit");
        
        // Update allocation status using FHE
        allocations[_allocationId].amount = encryptedAmount;
        allocations[_allocationId].isActive = FHE.asEbool(false);
        
        emit TreasuryAllocated(_allocationId, allocations[_allocationId].recipient, encryptedAmount.decrypt());
    }
    
    function createEncryptedAllocation(
        string memory _purpose,
        address _recipient,
        externalEuint32 _amount,
        bytes calldata _inputProof
    ) public returns (uint256) {
        require(members[msg.sender].isActive.decrypt(), "Only active members can create allocations");
        
        uint256 allocationId = allocationCounter++;
        allocations[allocationId] = TreasuryAllocation({
            allocationId: FHE.asEuint32(allocationId),
            amount: _amount,
            isActive: FHE.asEbool(true),
            purpose: _purpose,
            recipient: _recipient,
            createdAt: block.timestamp
        });
        
        emit TreasuryAllocated(allocationId, _recipient, _amount.decrypt());
        return allocationId;
    }
    
    function getProposalInfo(uint256 _proposalId) public view returns (
        string memory description,
        address proposer,
        uint256 deadline,
        uint256 createdAt,
        bool isActive,
        bool isExecuted
    ) {
        TreasuryProposal memory proposal = proposals[_proposalId];
        return (
            proposal.description,
            proposal.proposer,
            proposal.deadline,
            proposal.createdAt,
            proposal.isActive.decrypt(),
            proposal.isExecuted.decrypt()
        );
    }
    
    function getMemberInfo(address _member) public view returns (
        uint32 reputation,
        uint32 votingPower,
        bool isActive,
        uint256 joinedAt
    ) {
        MemberReputation memory member = members[_member];
        return (
            member.reputation.decrypt(),
            member.votingPower.decrypt(),
            member.isActive.decrypt(),
            member.joinedAt
        );
    }
}
