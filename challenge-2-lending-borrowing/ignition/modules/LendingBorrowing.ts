// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const LendingBorrowingModule = buildModule('LendingBorrowingModule', (m) => {

    const collateralToken = m.getParameter('collateralToken', '0x4D039C42243643EC7015A64B93bdb5A89ddD5944');
    const lendingToken = m.getParameter('lendingToken', '0xdD6AC228fc29b3827E8E728Da1737322E84FF1a6');
    const collateralFactor = m.getParameter('collateralFactor', 50);

    const lendingBorrowing = m.contract('LendingBorrowing', [collateralToken, lendingToken, collateralFactor], { id: 'LendingBorrowing' });

    return { lendingBorrowing };
});

export default LendingBorrowingModule;


