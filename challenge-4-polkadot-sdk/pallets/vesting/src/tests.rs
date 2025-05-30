#![cfg(test)]

use super::*;
use polkadot_sdk::frame_support::{assert_noop, assert_ok};
use polkadot_sdk::pallet_balances::{BalanceLock, Reasons};
use mock::*;


// HINTS:
// - Set block number in mock tests : System::set_block_number(<number>);
// - Get signed origin from the caller: RuntimeOrigin::signed(ALICE)/ RuntimeOrigin::signed(BOB)
// - Call vested_transfer with the origin, destination, and schedule : Vesting::vested_transfer(origin, dest, schedule)
// - Get the vesting schedules for an account: Vesting::vesting_schedules(&<account>)
// - Get error : Error::<Runtime>::ZeroVestingPeriod / Error::<Runtime>::ZeroVestingPeriodCount
// - Get the balance of an account: PalletBalances::free_balance(&<account>)
// - Get locked balance of an account: Vesting::locked(&<account>)
// - Transfer balance : PalletBalances::transfer(&<account>, &<account>, <amount>, <reason>)


#[test]
fn vested_transfer_works() {
	ExtBuilder::build().execute_with(|| {
		// TODO: check if the vested transfer works
	});
}


#[test]
fn vested_transfer_fails_if_zero_period_or_count() {
    ExtBuilder::build().execute_with(|| { 
		// TODO: check if the vested transfer fails if the period or count is zero

    });
}

#[test]
fn claim_works() {
	ExtBuilder::build().execute_with(|| {
		// TODO: check if the claim works
	});
}

#[test]
fn update_vesting_schedules_works() {
	ExtBuilder::build().execute_with(|| {
		// TODO: check if the update vesting schedules works
	});
}


#[test]
fn multiple_vesting_schedule_claim_works() {
	ExtBuilder::build().execute_with(|| {

		// TODO: check if the multiple vesting schedule claim works
	});
}



