const ethers = require('ethers');
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_PROVIDER = process.env.RPC_PROVIDER;
const LOYALTY_PROGRAM_ADDRESS = process.env.LOYALTY_PROGRAM_ADDRESS;  

const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const LOYALTY_PROGRAM_ABI = [
  {
    "constant": true,
    "inputs": [{"name": "account", "type": "address"}],
    "name": "getLoyaltyPoints",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]; 
const LOYALTY_PROGRAM_BYTECODE = '0x'; 

const deployLoyaltyProgram = async () => {
  try {
    const LoyaltyProgramFactory = new ethers.ContractFactory(
      LOYALTY_PROGRAM_ABI,
      LOYALTY_PROGRAM_BYTECODE,
      signer,
    );
    const loyaltyProgram = await LoyaltyProgramFactory.deploy();
    await loyaltyProgram.deployed();
    console.log(`LoyaltyProgram contract deployed to: ${loyaltyProgram.address}`);
  } catch (error) {
    console.error('Failed to deploy LoyaltyProgram contract:', error);
  }
};

const getLoyaltyPointsBalance = async (accountAddress) => {
  try {
    const loyaltyProgram = new ethers.Contract(
      LOYALTY_PROGRAM_ADDRESS,
      LOYALTY_PROGRAM_ABI,
      provider 
    );

    const points = await loyaltyProgram.getLoyaltyPoints(accountAddress);
    console.log(`Loyalty points for account ${accountAddress}: ${points.toString()}`);
  } catch (error) {
    console.error('Failed to get loyalty points balance:', error);
  }
};
