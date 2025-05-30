//! NativePool pallet for managing native token deposits and daily rewards.
//!
//! This pallet allows users to deposit native tokens into a pool and receive
//! proportional daily rewards. Users can withdraw their deposits plus accumulated
//! rewards at any time. Only authorized team members can deposit rewards.

#![cfg_attr(not(feature = "std"), no_std)]

use frame::prelude::*;
use polkadot_sdk::polkadot_sdk_frame as frame;
use polkadot_sdk::frame_support::{
	traits::{Currency, ExistenceRequirement, Get},
	PalletId,
};
use polkadot_sdk::sp_runtime::{
	traits::{AccountIdConversion, Saturating, Zero}
};

// Re-export all pallet parts, this is needed to properly import the pallet into the runtime.
pub use pallet::*;

type BalanceOf<T> =
	<<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;

type BlockNumberFor<T> = frame_system::pallet_prelude::BlockNumberFor<T>;

/// Information about a user's deposit in the pool
#[derive(Clone, Encode, Decode, MaxEncodedLen, TypeInfo, Debug, PartialEq)]
pub struct DepositInfo<Balance, BlockNumber> {
	/// The amount deposited by the user
	pub amount: Balance,
	/// The block number when the deposit was made
	pub deposit_block: BlockNumber,
	/// The reward per share at the time of deposit (used for reward calculation)
	pub reward_debt: Balance,
}

#[frame::pallet]
pub mod pallet {
	use super::*;

	#[pallet::config]
	pub trait Config: polkadot_sdk::frame_system::Config {


		type Currency: Currency<Self::AccountId>;

		/// The pallet's account ID for holding pooled funds
		#[pallet::constant]
		type PalletId: Get<PalletId>;

		/// The origin that can deposit rewards (team members)
		type RewardOrigin: EnsureOrigin<Self::RuntimeOrigin>;
	}

	#[pallet::pallet]
	pub struct Pallet<T>(_);

	/// Total amount deposited in the pool by all users
	#[pallet::storage]
	#[pallet::getter(fn total_deposited)]
	pub type TotalDeposited<T: Config> = StorageValue<_, BalanceOf<T>, ValueQuery>;

	/// Total rewards accumulated in the pool
	#[pallet::storage]
	#[pallet::getter(fn total_rewards)]
	pub type TotalRewards<T: Config> = StorageValue<_, BalanceOf<T>, ValueQuery>;

	/// Accumulated reward per share (scaled by 1e12 for precision)
	#[pallet::storage]
	#[pallet::getter(fn acc_reward_per_share)]
	pub type AccRewardPerShare<T: Config> = StorageValue<_, BalanceOf<T>, ValueQuery>;

	/// Information about each user's deposit
	#[pallet::storage]
	#[pallet::getter(fn deposits)]
	pub type Deposits<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		T::AccountId,
		DepositInfo<BalanceOf<T>, BlockNumberFor<T>>,
		OptionQuery,
	>;

	/// Last block when rewards were updated
	#[pallet::storage]
	#[pallet::getter(fn last_reward_block)]
	pub type LastRewardBlock<T: Config> = StorageValue<_, BlockNumberFor<T>, ValueQuery>;


	#[pallet::error]
	pub enum Error<T> {
		/// User has no deposit in the pool
		NoDeposit,
		/// Insufficient balance to deposit
		InsufficientBalance,
		/// Amount must be greater than zero
		ZeroAmount,
		/// Insufficient pool balance for withdrawal
		InsufficientPoolBalance,
		/// Arithmetic overflow occurred
		ArithmeticOverflow,
	}

	#[pallet::call]
	impl<T: Config> Pallet<T> {
		/// Deposit native tokens into the pool
		///
		/// The dispatch origin for this call must be _Signed_.
		///
		/// - `amount`: The amount of tokens to deposit
		#[pallet::call_index(0)]
		#[pallet::weight({10_000})]
		pub fn deposit(
			origin: OriginFor<T>,
			amount: BalanceOf<T>,
		) -> DispatchResult {
			// TODO: Implement deposit functionality
			// 1. Ensure origin is signed
			// 2. Validate amount > 0 and user has sufficient balance
			// 3. Update pool state
			// 4. Transfer tokens from user to pool account
			// 5. Update or create user's deposit info with proper reward_debt
			// 6. Update total deposited amount
			// 
			// Hints:
			// - Use Self::update_pool() before modifying state
			// - Calculate reward_debt = amount × AccRewardPerShare / precision
			// - Use Deposits::<T>::mutate() to handle existing vs new deposits
			todo!()
		}

		/// Withdraw tokens and rewards from the pool
		///
		/// The dispatch origin for this call must be _Signed_.
		///
		/// - `amount`: The amount of deposited tokens to withdraw (None for full withdrawal)
		#[pallet::call_index(1)]
		#[pallet::weight({10_000})]
		pub fn withdraw(
			origin: OriginFor<T>,
			amount: Option<BalanceOf<T>>,
		) -> DispatchResult {
			// TODO: Implement withdraw functionality
			// 1. Ensure origin is signed and user has deposit
			// 2. Update pool state
			// 3. Calculate pending rewards
			// 4. Determine withdrawal amount (use deposit amount if None)
			// 5. Validate withdrawal amount and pool balance
			// 6. Update user's deposit info (remove if full withdrawal)
			// 7. Update total deposited
			// 8. Transfer tokens + rewards back to user
			//
			// Hints:
			// - total_withdrawal = withdraw_amount + pending_rewards
			// - For partial withdrawal, recalculate reward_debt for remaining amount
			// - Use Deposits::<T>::remove() for full withdrawal
			todo!()
		}

		/// Claim pending rewards without withdrawing deposit
		///
		/// The dispatch origin for this call must be _Signed_.
		#[pallet::call_index(2)]
		#[pallet::weight({10_000})]
		pub fn claim_rewards(origin: OriginFor<T>) -> DispatchResult {
			// TODO: Implement claim_rewards functionality
			// 1. Ensure origin is signed and user has deposit
			// 2. Update pool state
			// 3. Calculate pending rewards
			// 4. Validate rewards > 0 and pool has sufficient balance
			// 5. Update user's reward_debt to current level
			// 6. Transfer rewards to user
			//
			// Hints:
			// - Only transfer rewards, keep deposit amount unchanged
			// - Update reward_debt = amount × AccRewardPerShare / precision
			todo!()
		}

		/// Deposit rewards into the pool (team only)
		///
		/// The dispatch origin for this call must be from `RewardOrigin`.
		///
		/// - `amount`: The amount of rewards to deposit
		#[pallet::call_index(3)]
		#[pallet::weight({10_000})]
		pub fn deposit_rewards(
			origin: OriginFor<T>,
			amount: BalanceOf<T>,
		) -> DispatchResult {
			// TODO: Implement deposit_rewards functionality
			// 1. Ensure origin is from RewardOrigin and signed
			// 2. Validate amount > 0
			// 3. Update pool state
			// 4. Transfer rewards to pool account
			// 5. Update total rewards
			// 6. Update AccRewardPerShare if there are deposits
			//
			// Hints:
			// - Use T::RewardOrigin::ensure_origin(origin.clone())?
			// - reward_per_share_increase = amount × precision / total_deposited
			// - Only update AccRewardPerShare if total_deposited > 0
			todo!()
		}
	}

	impl<T: Config> Pallet<T> {
		/// The account ID of the pool
		pub fn account_id() -> T::AccountId {
			// TODO: Convert PalletId to AccountId
			// Hint: Use T::PalletId::get().into_account_truncating()
			todo!()
		}

		/// Precision factor for reward calculations (1e12)
		fn precision() -> BalanceOf<T> {
			// TODO: Return 1e12 as BalanceOf<T>
			// Hint: 1_000_000_000_000
			todo!()
		}

		/// Update pool state (called before any state-changing operation)
		fn update_pool() -> DispatchResult {
			// TODO: Update the last reward block
			// 1. Get current block number
			// 2. Update LastRewardBlock storage
			// Hint: Use frame_system::Pallet::<T>::block_number()
			todo!()
		}
		/// Calculate pending rewards for a user
		fn calculate_pending_rewards(who: &T::AccountId) -> Result<BalanceOf<T>, DispatchError> {
			// TODO: Implement reward calculation
			// 1. Get user's deposit info
			// 2. Get current AccRewardPerShare
			// 3. Calculate total rewards user should have: amount × AccRewardPerShare / precision
			// 4. Calculate pending: total_rewards - reward_debt
			//
			// Formula: pending = (amount × AccRewardPerShare / precision) - reward_debt
			//
			// This works because:
			// - total_rewards = what user would earn if they were here from start
			// - reward_debt = what they would have earned before they joined
			// - pending = what they actually earned since joining
			todo!()
		}

	}
}
