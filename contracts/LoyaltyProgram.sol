// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoyaltyRewardsProgram {
    address public contractOwner;
    mapping(address => uint) public userTokenBalances;

    event TokensAccrued(address indexed user, uint tokenAmount);
    event TokensSpent(address indexed user, uint tokenAmount);

    modifier isContractOwner() {
        require(msg.sender == contractOwner, "Restricted: Only the contract owner can perform this action.");
        _;
    }

    constructor() {
        contractOwner = msg.sender;
    }

    function accrueTokensForUser(address user, uint tokenAmount) external isContractOwner {
        require(user != address(0), "Error: Cannot accrue tokens to the zero address.");
        require(tokenAmount > 0, "Error: Token amount should be greater than 0.");
        userTokenBalances[user] += tokenAmount;
        emit TokensAccrued(user, tokenAmount);
    }

    function spendTokens(uint tokenAmount) external {
        require(tokenAmount > 0, "Error: Token amount should be greater than 0.");
        require(userTokenBalances[msg.sender] >= tokenAmount, "Error: Insufficient token balance.");
        userTokenBalances[msg.sender] -= tokenAmount;
        emit TokensSpent(msg.sender, tokenAmount);
    }

    function getUserTokenBalance(address user) external view returns (uint) {
        return userTokenBalances[user];
    }
}