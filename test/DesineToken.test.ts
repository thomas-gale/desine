import { ethers } from "hardhat";
import { expect } from "chai";

describe("DesineToken contract", function () {
  async function deployContractFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const DesineToken = await ethers.getContractFactory("DesineToken");
    const deployedContract = await DesineToken.deploy();
    await deployedContract.deployed();
    return { owner, addr1, addr2, deployedContract };
  }
  async function deployContractFixtureWithSomeTokens() {
    const { owner, addr1, addr2, deployedContract, ...rest } =
      await deployContractFixture();
    const cid1 = "1234";
    const cid2 = "12345";
    const cid3 = "123456";
    await deployedContract.connect(owner).mint(cid1, cid1);
    await deployedContract.connect(addr1).mint(cid2, cid2);
    await deployedContract.connect(addr2).mint(cid3, cid3);
    return { owner, addr1, addr2, deployedContract, ...rest };
  }
  it("Should deploy", async function () {
    const { deployedContract } = await deployContractFixture();
    expect(deployedContract).to.not.equal(undefined);
  });
  it("Should addr1 mint", async function () {
    const { addr1, deployedContract } = await deployContractFixture();
    const cid = "12345";
    const metadata_cid = "metadata";
    await deployedContract.connect(addr1).mint(cid, metadata_cid);
    const balance = await deployedContract.balanceOfCid(addr1.address, cid);
    expect(balance).to.equal(1);
  });
  it("Should list all tokens", async function () {
    const { deployedContract } = await deployContractFixtureWithSomeTokens();
    const numberTokenIds = await deployedContract.getNumberTokenIds();
    expect(numberTokenIds).to.equal(3);
    const tokenIds = await deployedContract.getTokenIds();
    for (const tokenId of tokenIds) {
      const tokenCid = await deployedContract.cids(tokenId);
      console.log("token id: %s, token cid:", tokenId, tokenCid);
      expect(tokenCid).to.not.equal(undefined);
    }
  });
});
