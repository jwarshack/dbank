
const hre = require("hardhat");

async function main() {

  const Token = await hre.ethers.getContractFactory("Token")
  const token = await Token.deploy()
  await token.deployed()


  console.log("Token deployed to:", token.address);

  const Bank = await hre.ethers.getContractFactory("Bank")
  const bank = await Bank.deploy(token.address)
  await bank.deployed()

  console.log("Bank deployed to: ", bank.address)

  await token.passMinterRole(bank.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
