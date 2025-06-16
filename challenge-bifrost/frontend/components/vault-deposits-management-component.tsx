"use client";

import { useReadContracts, useReadContract } from "wagmi";
import { useAccount } from "wagmi";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  RefreshCcw,
  ArrowLeftRight,
  OctagonAlert,
  EqualApproximately,
  BanknoteArrowDown,
} from "lucide-react";
import {
  TOKEN_LIST,
  L2SLPX_CONTRACT_ADDRESS,
  YIELD_DELEGATION_VAULT_CONTRACT_ADDRESS,
} from "@/lib/constants";
import { l2SlpxAbi, yieldDelegationVaultAbi } from "@/lib/abis";
import { useMediaQuery } from "@/hooks/use-media-query";
import { formatEther } from "viem";
import { roundLongDecimals } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@radix-ui/react-dialog";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function VaultDepositsManagementComponent() {
  const { address } = useAccount();

  const {
    data: dataBatch,
    isLoading: isDataBatchLoading,
    isError: isDataBatchError,
    error: dataBatchError,
    refetch: refetchDataBatch,
  } = useReadContracts({
    contracts: [
      // depositor records
      {
        address: YIELD_DELEGATION_VAULT_CONTRACT_ADDRESS,
        abi: yieldDelegationVaultAbi,
        functionName: "getDepositorRecord",
        args: [address as `0x${string}`],
      },
      // vETH/ETH conversion info
      {
        address: L2SLPX_CONTRACT_ADDRESS,
        abi: l2SlpxAbi,
        functionName: "getTokenConversionInfo",
        args: ["0x0000000000000000000000000000000000000000"],
      },
      // vDOT/DOT conversion info
      {
        address: L2SLPX_CONTRACT_ADDRESS,
        abi: l2SlpxAbi,
        functionName: "getTokenConversionInfo",
        args: [
          TOKEN_LIST.filter((token) => token.symbol === "DOT")[0]
            .address as `0x${string}`,
        ],
      },
    ],
  });

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Vault Deposits Management</h1>
        <p className="text-muted-foreground">
          Manage and withdraw your deposits from the Vault
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-bold">Overview</h2>
          <Button
            className="hover:cursor-pointer"
            variant="secondary"
            size="icon"
            onClick={() => refetchDataBatch()}
          >
            <RefreshCcw />
          </Button>
        </div>
        {isDataBatchError && (
          <div className="flex flex-row gap-2 items-center bg-red-500 p-2 text-secondary">
            <OctagonAlert className="w-4 h-4" />
            <p className="text-lg font-bold">{dataBatchError?.message}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 border border-muted-accent rounded-md p-4">
            <h2 className="text-md font-bold">vETH/ETH</h2>
            {isDataBatchLoading ? (
              <Skeleton className="w-[50px] h-[20px] rounded-md" />
            ) : (
              <p className="text-xl text-muted-foreground">
                {formatEther(
                  dataBatch?.[1]?.result?.tokenConversionRate ?? BigInt(0)
                )}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 border border-muted-accent rounded-md p-4">
            <h2 className="text-md font-bold">vDOT/DOT</h2>
            {isDataBatchLoading ? (
              <Skeleton className="w-[50px] h-[20px] rounded-md" />
            ) : (
              <p className="text-xl text-muted-foreground">
                {formatEther(
                  dataBatch?.[2]?.result?.tokenConversionRate ?? BigInt(0)
                )}
              </p>
            )}
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-2 border border-muted-accent rounded-md p-4">
          <h2 className="text-md font-bold">Number of Deposits</h2>
          {isDataBatchLoading ? (
            <Skeleton className="w-[50px] h-[20px] rounded-md" />
          ) : (
            <p className="text-xl text-muted-foreground">
              {dataBatch?.[0]?.result?.totalNumberOfDeposits.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Deposits</h2>
          {isDataBatchLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-[120px] rounded-md" />
            ))
          ) : (
            <>
              {dataBatch?.[0]?.result?.depositIds.map((depositId) => (
                <VaultDepositInfo
                  key={depositId}
                  depositId={depositId}
                  currentTokenConversionRate={{
                    vethTokenConversionRate:
                      dataBatch?.[1]?.result?.tokenConversionRate ??
                      BigInt(0),
                    dotTokenConversionRate:
                      dataBatch?.[2]?.result?.tokenConversionRate ?? BigInt(0),
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function VaultDepositInfo({
  depositId,
  currentTokenConversionRate,
}: {
  depositId: bigint;
  currentTokenConversionRate: {
    vethTokenConversionRate: bigint;
    dotTokenConversionRate: bigint;
  };
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const {
    data: vaultDepositRecord,
    isLoading: isVaultDepositRecordLoading,
    isError: isVaultDepositRecordError,
    error: vaultDepositRecordError,
    refetch: refetchVaultDepositRecord,
  } = useReadContract({
    address: YIELD_DELEGATION_VAULT_CONTRACT_ADDRESS,
    abi: yieldDelegationVaultAbi,
    functionName: "getVaultDepositRecord",
    args: [depositId],
  });

  function formatTokenAddress(tokenAddress: `0x${string}`) {
    if (tokenAddress === "0x8bFA30329F2A7A7b72fa4A76FdcE8aC92284bb94") {
      return "vDOT";
    }
    if (tokenAddress === "0x6e0f9f2d25CC586965cBcF7017Ff89836ddeF9CC") {
      return "vETH";
    }
    if (tokenAddress === "0x0000000000000000000000000000000000000000") {
      return "ETH";
    }
    if (tokenAddress === "0x4B16E254E7848e0826eBDd3049474fD9E70A244c") {
      return "DOT";
    }
    return "n/a";
  }

  return (
    <div className="flex flex-col gap-2 border border-muted-accent rounded-md p-4">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-md font-bold text-center bg-primary text-secondary rounded-md px-2 py-1 w-fit">
          {depositId.toString()}
        </h2>
        <div className="flex flex-row items-center gap-2">
          <Button
            className="hover:cursor-pointer"
            variant="secondary"
            size="icon"
            onClick={() => refetchVaultDepositRecord()}
          >
            <RefreshCcw />
          </Button>
          {isDesktop ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover:cursor-pointer">
                  <BanknoteArrowDown />
                  Withdraw
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw your deposit</DialogTitle>
                  <DialogDescription>
                    Please review the details below.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-lg font-bold">Withdrawing</p>
                    <p className="text-lg font-bold">
                      {
                        vaultDepositRecord?.amountDeposited && vaultDepositRecord?.depositConversionRate ?
                        roundLongDecimals(formatEther(
                          (vaultDepositRecord.amountDeposited * BigInt(10 ** 18) / (
                            vaultDepositRecord.tokenAddress === "0x6e0f9f2d25CC586965cBcF7017Ff89836ddeF9CC" ?
                            currentTokenConversionRate.vethTokenConversionRate :
                            currentTokenConversionRate.dotTokenConversionRate
                          ))
                        ), 8) : "0"
                      }
                    </p>
                    <p className="text-lg font-bold">
                      {
                        formatTokenAddress(
                          vaultDepositRecord?.tokenAddress ??
                            "0x0000000000000000000000000000000000000000"
                        )
                      }
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-md text-muted-foreground">Equivalent to</p>
                    <EqualApproximately className="w-4 h-4 text-muted-foreground" />
                    <p className="text-md text-muted-foreground">
                      {
                        vaultDepositRecord?.amountDeposited && vaultDepositRecord?.depositConversionRate ?
                        roundLongDecimals(formatEther(
                          (vaultDepositRecord.amountDeposited * BigInt(10 ** 18) / vaultDepositRecord.depositConversionRate)
                        ), 8) : "0"
                      }
                    </p>
                    <p className="text-md text-muted-foreground">
                      {
                        formatTokenAddress(
                          vaultDepositRecord?.tokenAddress ??
                            "0x0000000000000000000000000000000000000000"
                        ) === "vETH" ? "ETH" : "DOT"
                      }
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button className="hover:cursor-pointer">Withdraw</Button>
                  <DialogClose asChild>
                    <Button variant="outline" className="hover:cursor-pointer">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="hover:cursor-pointer">
                  <BanknoteArrowDown />
                  Withdraw
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Withdraw your deposit</DrawerTitle>
                  <DrawerDescription>
                    Please review the details below.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col gap-2 px-4">
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-lg font-bold">Withdrawing</p>
                    <p className="text-lg font-bold">
                      {
                        vaultDepositRecord?.amountDeposited && vaultDepositRecord?.depositConversionRate ?
                        roundLongDecimals(formatEther(
                          (vaultDepositRecord.amountDeposited * BigInt(10 ** 18) / (
                            vaultDepositRecord.tokenAddress === "0x6e0f9f2d25CC586965cBcF7017Ff89836ddeF9CC" ?
                            currentTokenConversionRate.vethTokenConversionRate :
                            currentTokenConversionRate.dotTokenConversionRate
                          ))
                        ), 8) : "0"
                      }
                    </p>
                    <p className="text-lg font-bold">
                      {
                        formatTokenAddress(
                          vaultDepositRecord?.tokenAddress ??
                            "0x0000000000000000000000000000000000000000"
                        )
                      }
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-md text-muted-foreground">Equivalent to</p>
                    <EqualApproximately className="w-4 h-4 text-muted-foreground" />
                    <p className="text-md text-muted-foreground">
                      {
                        vaultDepositRecord?.amountDeposited && vaultDepositRecord?.depositConversionRate ?
                        roundLongDecimals(formatEther(
                          (vaultDepositRecord.amountDeposited * BigInt(10 ** 18) / vaultDepositRecord.depositConversionRate)
                        ), 8) : "0"
                      }
                    </p>
                    <p className="text-md text-muted-foreground">
                      {
                        formatTokenAddress(
                          vaultDepositRecord?.tokenAddress ??
                            "0x0000000000000000000000000000000000000000"
                        ) === "vETH" ? "ETH" : "DOT"
                      }
                    </p>
                  </div>
                </div>
                <DrawerFooter>
                  <Button className="hover:cursor-pointer">Withdraw</Button>
                  <DrawerClose asChild>
                    <Button variant="outline" className="hover:cursor-pointer">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        {isVaultDepositRecordError && (
          <div className="flex flex-row gap-2 items-center bg-red-500 p-2 text-secondary">
            <OctagonAlert className="w-4 h-4" />
            <p className="text-lg font-bold">
              {vaultDepositRecordError?.message}
            </p>
          </div>
        )}
        {isVaultDepositRecordLoading ? (
          <>
            <Skeleton className="w-[100px] h-[30px] rounded-md" />
            <Skeleton className="w-[100px] h-[18px] rounded-md" />
          </>
        ) : (
          <>
            <div className="flex flex-row items-end gap-2">
              <p className="text-3xl font-bold">
                {formatEther(
                  vaultDepositRecord?.amountDeposited ?? BigInt(0)
                )}
              </p>
              <p className="text-xl font-medium">
                {formatTokenAddress(
                  (vaultDepositRecord?.tokenAddress ??
                    "0x0000000000000000000000000000000000000000") as `0x${string}`
                )}
              </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-lg text-muted-foreground">
                {formatEther(
                  vaultDepositRecord?.depositConversionRate ?? BigInt(0)
                )}
              </p>
              <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                {vaultDepositRecord?.amountDeposited &&
                vaultDepositRecord?.depositConversionRate
                  ? roundLongDecimals(
                      formatEther(
                        (vaultDepositRecord.amountDeposited *
                          BigInt(10 ** 18)) /
                          vaultDepositRecord.depositConversionRate
                      ),
                      8
                    )
                  : "0"}
              </p>
              <p className="text-lg text-muted-foreground">
                {formatTokenAddress(
                  (vaultDepositRecord?.tokenAddress ??
                    "0x0000000000000000000000000000000000000000") as `0x${string}`
                ) === "vETH"
                  ? "ETH"
                  : "DOT"}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}