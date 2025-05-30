import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import hre from "hardhat";
import { 
    LendingBorrowing,
    MockERC20
} from "../typechain-types";

describe("LendingBorrowing", function () {
    let lendingBorrowing: LendingBorrowing;
    let collateralToken: MockERC20;
    let lendingToken: MockERC20;
    let owner: HardhatEthersSigner;
    let user1: HardhatEthersSigner;
    let user2: HardhatEthersSigner;
    
    const COLLATERAL_FACTOR: bigint = 50n; // 50%
    const INITIAL_SUPPLY: bigint = ethers.parseEther("1000000"); // 1 million tokens

    beforeEach(async function () {
        [owner, user1, user2] = await hre.ethers.getSigners();

        // TODO: Deploy Collateral tokens
        // - Deploy MockERC20 for collateral token
        // - Set name and symbol

        // TODO: Deploy Lending tokens
        // - Deploy MockERC20 for lending token
        // - Set name and symbol

        // TODO: Mint initial supply
        // - Mint tokens to owner
        // - Mint lending tokens to owner

        // TODO: Deploy LendingBorrowing contract
        // - Deploy with correct parameters
        // - Pass token addresses and collateral factor

        // TODO: Setup test environment
        // - Transfer tokens to users
        // - Transfer lending tokens to contract
    });

    describe("Contract Deployment", function () {
        it("Should set the correct collateral factor", async function () {
            // TODO: Test collateral factor is set correctly
        });

        it("Should set the correct token addresses", async function () {
            // TODO: Test token addresses are set correctly
        });

        it("Check balance of user1", async function () {
            // TODO: Test user1 has correct collateral token balance
        });

        it("Check balance of lendingBorrowing", async function () {
            // TODO: Test contract has correct lending token balance
        });
    });

    describe("Collateral Management", function () {
        const depositAmount: bigint = ethers.parseUnits("100", 18);

        beforeEach(async function () {
            // TODO: Approve tokens for deposit
        });

        it("Should allow users to deposit collateral", async function () {
            // TODO: Test collateral deposit
            // - Call depositCollateral
            // - Check event emission
            // - Verify balance update
        });

        it("Should not allow zero amount deposits", async function () {
            // TODO: Test zero amount deposit should revert
        });

        it("Should allow users to withdraw collateral if no active loan", async function () {
            // TODO: Test collateral withdrawal
            // - Deposit collateral first
            // - Withdraw collateral
            // - Check event emission
            // - Verify balance update
        });

        it("Should not allow withdrawal of locked collateral", async function () {
            // TODO: Test locked collateral withdrawal
            // - Deposit collateral
            // - Take loan
            // - Try to withdraw locked collateral
            // - Should revert
        });
    });

    describe("Loan Operations", function () {
        const collateralAmount: bigint = ethers.parseEther("100");
        const loanAmount: bigint = ethers.parseEther("40");

        beforeEach(async function () {
            // TODO: Setup for loan tests
            // - Approve collateral tokens
            // - Deposit collateral
        });

        it("Should allow users to take loans within collateral limit", async function () {
            // TODO: Test taking loan
            // - Take loan within limit
            // - Check event emission
            // - Verify loan details
        });

        it("Should not allow loans exceeding collateral limit", async function () {
            // TODO: Test excessive loan should revert
        });

        it("Should not allow multiple active loans", async function () {
            // TODO: Test multiple loans should revert
            // - Take first loan
            // - Try to take second loan
            // - Should revert
        });

        it("Should allow users to repay loans", async function () {
            // TODO: Test loan repayment
            // - Take loan first
            // - Approve repayment tokens
            // - Repay loan
            // - Check event emission
            // - Verify loan status
        });

        it("Should not allow repayment of non-existent loans", async function () {
            // TODO: Test repaying non-existent loan should revert
        });
    });

    describe("Owner Functions", function () {
        it("Should allow owner to change collateral factor", async function () {
            // TODO: Test changing collateral factor
            // - Call setCollateralFactor as owner
            // - Verify factor is updated
        });

        it("Should not allow non-owners to change collateral factor", async function () {
            // TODO: Test non-owner cannot change factor
            // - Call setCollateralFactor as non-owner
            // - Should revert with unauthorized error
        });

        it("Should not allow collateral factor greater than 100", async function () {
            // TODO: Test invalid collateral factor
            // - Try to set factor > 100
            // - Should revert
        });
    });
});