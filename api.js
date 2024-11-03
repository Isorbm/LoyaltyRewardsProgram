require('dotenv').config();
const ethers = require('ethers');

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PROVIDER = new ethers.providers.JsonRpcProvider(API_KEY);

const signer = new ethers.Wallet(PRIVATE_KEY, PROVIDER);

const contractABI = [
    "function earnReward(uint256 amount) public",
    "function redeemReward(uint256 amount) public",
];

const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

const SmartContractAPI = {
    earnReward: async (amount) => {
        try {
            const tx = await contract.earnReward(amount);
            await tx.wait();
            console.log(`Successfully earned ${amount} reward`);
        } catch (error) {
            SmartContractAPI.handleError(error, "earning reward");
        }
    },

    redeemReward: async (amount) => {
        try {
            const tx = await contract.redeemReward(amount);
            await tx.wait();
            console.log(`Successfully redeemed ${amount} reward`);
        } catch (error) {
            SmartContractAPI.handleError(error, "redeeming reward");
        }
    },

    handleError: (error, action) => {
        if (error.code === 'NETWORK_ERROR') {
            console.error(`Network error while ${action}: ${error.message}`);
        } else if (error.code === 'UNSUPPORTED_OPERATION') {
            console.error(`Unsupported operation while ${action}: ${error.message}`);
        } else if (error instanceof ethers.errors.TransactionFailed) {
            console.error(`Transaction failed while ${action}: ${error.transactionHash}`);
        } else if (error.code === 'CALL_EXCEPTION') {
            console.error(`Smart contract call exception while ${action}: ${error.message}`);
        } else {
            console.error(`Error ${action}:`, error);
        }
    }
};

module.exports = SmartContractAPI;