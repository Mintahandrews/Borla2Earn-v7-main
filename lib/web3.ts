import { http } from 'viem';
import { mainnet, sepolia } from 'viem/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { type Chain } from 'viem/chains';

// Define ApeChain configuration
export const apecoin = {
  id: 33111,
  name: 'ApeChain',
  nativeCurrency: {
    decimals: 18,
    name: 'ApeCoin',
    symbol: 'APE',
  },
  rpcUrls: {
    public: { http: ['https://curtis.rpc.caldera.xyz/http'] },
    default: { http: ['https://curtis.rpc.caldera.xyz/http'] },
  },
  blockExplorers: {
    default: { name: 'ApeScan', url: 'https://curtis.apescan.io' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 10299506,
    },
  },
  testnet: true,
} as const satisfies Chain;

export const config = getDefaultConfig({
  appName: 'Borla2Earn',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains: [apecoin],
  ssr: true,
  transports: {
    [apecoin.id]: http(process.env.NEXT_PUBLIC_APECHAIN_RPC_URL || 'https://curtis.rpc.caldera.xyz/http'),
  },
});

// ABI for the Escrow contract
export const escrowABI = [
  // Add your Escrow contract ABI here
  // Example:
  // {
  //   "inputs": [],
  //   "name": "deposit",
  //   "outputs": [],
  //   "stateMutability": "payable",
  //   "type": "function"
  // },
] as const;

// Escrow contract address
export const escrowAddress = process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS || '0x04b4D278b879954c1190d583526244100FB78006';
