require('dotenv').config();
const ethers = require('ethers');

const blockchainNodeAPIKey = process.env.API_KEY;
const walletPrivateKey = process.env.PRIVATE_KEY;
const loyaltyContractAddress = process.env.CONTRACT_ADDRESS;
const blockchainProvider = new ethers.providers.JsonRpcProvider(blockchainNodeAPIKey);

const walletSigner = new ethers.Wallet(walletPrivateKey, blockchainProvider);

const loyaltyContractABI = [
    "function earnReward(uint256 amount) public",
    "function redeemReward(uint256 amount) public",
];

const loyaltyRewardsContract = new ethers.Contract(loyaltyContractAddress, loyaltyContractABI, walletSigner);

const LoyaltyRewardsAPI = {
    awardPoints: async (points) => {
        try {
            const transactionResponse = await loyaltyRewardsContract.earnReward(points);
            await transactionResponse.wait();
            console.log(`Successfully earned ${points} points`);
        } catch (error) {
            LoyaltyRewardsAPI.handleTransactionError(error, "awarding points");
        }
    },

    redeemPoints: async (points) => {
        try {
            const transactionResponse = await loyaltyRewardsContract.redeemReward(points);
            await transactionResponse.wait();
            console.log(`Successfully redeemed ${points} points`);
        } catch (error) {
            LoyaltyRewardsAPI.handleTransactionError(error, "redeeming points");
        }
    },

    handleTransactionError: (error, action) => {
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

module.exports = LoyaltyRewardsAPI;