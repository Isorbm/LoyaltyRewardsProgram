pragma solidity ^0.8.0;

contract LoyaltyRewards {
    address public owner;
    mapping(address => uint) public balances;

    event TokensEarned(address indexed user, uint amount);
    event TokensRedeemed(address indexed user, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function earnTokens(address user, uint amount) external onlyOwner {
        require(user != address(0), "Cannot earn tokens to the zero address.");
        require(amount > 0, "Amount should be greater than 0.");
        balances[user] += amount;
        emit TokensEarned(user, amount);
    }

    function redeemTokens(uint amount) external {
        require(amount > 0, "Amount should be greater than 0.");
        require(balances[msg.sender] >= amount, "Insufficient balance to redeem.");
        balances[msg.sender] -= amount;
        emit TokensRedeemed(msg.sender, amount);
    }

    function checkBalance(address user) external view returns (uint) {
        return balances[user];
    }
}