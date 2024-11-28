const ethers = require('ethers');
require('dotenv').config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_PROVIDER = process.env.RPC_PROVIDER;
const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const LOYALTY_PROGRAM_ABI = []; 
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
deployLoyaltyProgram();