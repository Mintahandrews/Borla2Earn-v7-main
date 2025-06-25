'use client';

import { useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { type Address } from 'viem';

// Minimal ABI for the Escrow contract
const escrowABI = [
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
] as const;

// Escrow contract address from environment variables
const escrowAddress = (process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS || '0x04b4D278b879954c1190d583526244100FB78006') as `0x${string}`;

export function useEscrow() {
  const { address, isConnected } = useAccount();

  // Read contract: Get user's balance
  const { 
    data: balance, 
    isLoading: isLoadingBalance,
    error: balanceError,
    refetch: refetchBalance 
  } = useReadContract({
    address: escrowAddress,
    abi: escrowABI,
    functionName: 'balanceOf',
    args: [address as Address],
    query: {
      enabled: isConnected && !!address,
    },
  });

  // Write contract: Deposit funds
  const { 
    data: depositTxHash,
    writeContractAsync: depositAsync,
    isPending: isDepositing,
    error: depositError,
    reset: resetDeposit
  } = useWriteContract();

  // Wait for deposit transaction to be mined
  const { isLoading: isWaitingForDeposit } = useWaitForTransactionReceipt({
    hash: depositTxHash,
  });

  // Handle deposit with error handling
  const depositFunds = async (amount: bigint) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet first');
    }
    
    try {
      const txHash = await depositAsync({
        address: escrowAddress,
        abi: escrowABI,
        functionName: 'deposit',
        value: amount,
      });
      
      return txHash;
    } catch (error) {
      console.error('Deposit failed:', error);
      throw error;
    }
  };

  // Refresh balance after deposit
  useEffect(() => {
    if (depositTxHash && !isWaitingForDeposit) {
      refetchBalance();
    }
  }, [depositTxHash, isWaitingForDeposit, refetchBalance]);

  return {
    balance: balance || BigInt(0),
    isLoadingBalance,
    balanceError,
    depositFunds,
    isDepositing: isDepositing || isWaitingForDeposit,
    depositError,
    resetDeposit,
    refetchBalance,
  };
}
