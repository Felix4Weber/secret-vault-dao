import { ethers } from "hardhat";

async function main() {
  console.log("Deploying SecretVaultDAO contract...");
  
  // Get the contract factory
  const SecretVaultDAO = await ethers.getContractFactory("SecretVaultDAO");
  
  // Deploy the contract with a verifier address (you can use any address for now)
  const verifierAddress = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"; // Example verifier address
  const secretVaultDAO = await SecretVaultDAO.deploy(verifierAddress);
  
  await secretVaultDAO.waitForDeployment();
  
  const contractAddress = await secretVaultDAO.getAddress();
  
  console.log("SecretVaultDAO deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
  
  // Verify the deployment
  console.log("Contract deployed successfully!");
  console.log("You can now interact with the contract at:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
