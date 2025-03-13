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
            console.error('User denied account access:', error);
        }
    } else {
        console.log('Please install MetaMask!');
    }
}
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const rewardContract = new ethers.Contract(contractAddress, contractABI, signer);
async function earnRewards(userId, amount) {
    try {
        const tx = await rewardContract.earnRewards(userId, ethers.utils.parseEther(amount.toString()));
        await tx.wait();
        console.log(`Rewards earned: ${amount}`);
    } catch (error) {
        console.error('Error earning rewards:', error);
    }
}
async function redeemRewards(userId, amount) {
    try {
        const tx = await rewardContract.redeemRewards(userId, ethers.utils.parseEther(amount.toString()));
        await tx.wait();
        console.log(`Rewards redeemed: ${amount}`);
    } catch (error) {
        console.error('Error redeeming rewards:', error);
    }
}
async function main() {
    const connectedWalletAddress = await connectWallet();
    console.log('Wallet connected:', connectedWalletAddress);
    await earnRewards('1', 10); 
    await redeemRewards('1', 5); 
}
main().catch(console.error);