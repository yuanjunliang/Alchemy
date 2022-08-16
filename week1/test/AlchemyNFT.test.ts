import { ethers } from "hardhat"
import { expect } from "chai"

describe("AlchemyNFT", function () {
  before(async function () {
    const signers = await ethers.getSigners()
    this.user1 = signers[0]
    this.user2 = signers[1]
  })

  beforeEach(async function () {
    this.AlchemyNFT = await ethers.getContractFactory("AlchemyNFT")
    this.alchemy = await this.AlchemyNFT.deploy()
    await this.alchemy.deployed()
  })

  it("test mint", async function () {
    await this.alchemy.connect(this.user1).mint(1, "https://www.google.com")
    expect(await this.alchemy.tokenURI(1)).to.eq("https://www.google.com")
  })

  it("tokenId can not repeat", async function () {
    await this.alchemy.connect(this.user1).mint(1, "https://www.google.com")
    await expect(
      this.alchemy.connect(this.user2).mint(1, "https://www.google.com/2")
    ).to.rejectedWith("")
  })

  it("can not mint once more", async function () {
    await this.alchemy.connect(this.user1).mint(1, "https://www.google.com")
    await expect(
      this.alchemy.connect(this.user1).mint(2, "https://www.google.com/1")
    ).to.rejectedWith("")
  })
})
