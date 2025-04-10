const ethers = require('ethers');
require('dotenv').config();

const contractABI = [];
const contractAddress = '0xYourContractAddress';

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected account:', accounts[0]);
            return accounts[0];
        } catch (error) {
            console.error('Failed to connect wallet. User denied account access or an error occurred:', error);
            throw error;
        }
    } else {
        const errorMessage = 'MetaMask is not installed. Please install MetaMask to use this feature.';
        console.log(errorMessage);
        throw new Error(errorMessage);
    }
}

let provider;
let signer;
let rewardContract;

try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    rewardContract = new ethers.Contract(contractAddress, contractABI, signer);
} catch (error) {
    console.error("Failed to set up provider, signer, or contract instance. Ensure Ethereum environment is correctly initialized:", error);
    throw error;
}

async function earnRewards(userId, amount) {
    try {
        const tx = await rewardContract.earnRewards(userId, ethers.utils.parseEther(amount.toString()));
        await tx.wait();
        console.log(`Rewards earned: ${amount}`);
    } catch (error) {
        console.error('Failed to earn rewards. An error occurred:', error);
        throw error;
    }
}

async function redeemRewards(userId, amount) {
    try {
        const tx = await rewardContract.redeemRewards(userId, ethers.utils.parseEther(amount.toString()));
        await tx.wait();
        console.log(`Rewards redeemed: ${amount}`);
    } catch (error) {
        console.error('Failed to redeem rewards. An error occurred:', error);
        throw error;
    }
}

async function main() {
    try {
        const connectedWalletAddress = await connectWallet();
        console.log('Wallet connected:', connectedWalletAddress);
        await earnRewards('1', 10); 
        await redeemRewards('1', 5);
    } catch (error) {
        console.error('An error occurred in the main function:', error);
    }
}

main().catch(console.error);