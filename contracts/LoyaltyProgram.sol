// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoyaltyRewardsProgram {
    address public owner;
    mapping(address => uint) public balances;

    event TokensAccrued(address indexed user, uint amount);
    event TokensRedeemed(address indexed user, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Restricted: Only the contract owner can perform this action.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addTokensToUser(address user, uint amount) external onlyOwner {
        require(user != address(0), "Error: Cannot add tokens to the zero address.");
        require(amount > 0, "Error: Amount should be greater than 0.");
        balances[user] += amount;
        emit TokensAccrued(user, amount);
    }

    function redeemTokens(uint amount) external {
        require(amount > 0, "Error: Amount should be greater than 0.");
        require(balances[msg.sender] >= amount, "Error: Insufficient token balance.");
        balances[msg.sender] -= amount;
        emit TokensRedeemed(msg.sender, amount);
    }

    function getBalance(address user) external view returns (uint) {
        return balances[user];
    }
}