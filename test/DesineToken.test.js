const { expect } = require("chai");

describe("DesineToken contract", function () {
  async function deployContractFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const DesineToken = await ethers.getContractFactory("DesineToken");
    const deployedContract = await DesineToken.deploy();
    await deployedContract.deployed();
    return { owner, addr1, addr2, deployedContract };
  }
  it("Should deploy", async function () {
    const { deployedContract } = await deployContractFixture();
    expect(deployedContract).to.not.equal(undefined);
  });
  it("Should owner mint", async function () {
    const { owner, deployedContract } = await deployContractFixture();
    const mintRes = await deployedContract.mint("asdf", "asdf");
    expect(mintRes).to.not.equal(undefined);
  });
});
