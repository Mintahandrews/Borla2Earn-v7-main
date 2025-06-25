'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { type Chain } from 'viem/chains';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { useEffect, useState } from 'react';

// Define ApeChain configuration
const apecoin = {
  id: 33111,
  name: 'ApeChain',
  network: 'apechain',
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
      address: '0xca11bde05977b3631167028862be2a173976ca11' as `0x${string}`,
      blockCreated: 10299506,
    },
  },
  testnet: true,
} as const;

// Setup queryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// Configure Wagmi
const config = createConfig({
  chains: [apecoin],
  transports: {
    [apecoin.id]: http(),
  },
  ssr: true,
});

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_PROJECT_ID',
  enableAnalytics: true,
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#9333ea',
    '--w3m-color-mix-strength': 20,
  },
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {mounted && children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
