import { ethers } from "hardhat";
import { expect } from "chai";

const { BigNumber } = ethers;

describe("BuyMeACoffee", function () {
  before(async function () {
    const signers = await ethers.getSigners();
    this.owner = signers[0];
    this.user1 = signers[1];
    this.user2 = signers[2];

    this.BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
    this.coffee = await this.BuyMeACoffee.deploy();
    await this.coffee.deployed();
    console.log("coffee address:", this.coffee.address);
  });

  it("buy coffee & withdraw", async function () {
    await this.coffee.connect(this.user1).buyCoffee("latte", "standard", {
      value: BigNumber.from(3).mul(BigNumber.from(10).pow(15)),
    });
    expect(await ethers.provider.getBalance(this.coffee.address)).to.eq(
      BigNumber.from(3).mul(BigNumber.from(10).pow(15))
    );

    await this.coffee.connect(this.owner).withdraw(this.owner.address);
    expect(await ethers.provider.getBalance(this.coffee.address)).to.eq(0);
  });
});
