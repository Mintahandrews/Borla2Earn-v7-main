'use client';

import { Button } from '@/components/ui/button';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import { LogOut, Wallet, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export function WalletConnectButton() {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { isConnected, address, isConnecting, isReconnecting } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const truncatedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  const handleConnect = async () => {
    try {
      await open({ view: 'Connect' });
    } catch (error) {
      console.error('Failed to open wallet modal:', error);
    }
  };

  const handleDisconnect = () => {
    try {
      disconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  if (!isMounted) {
    return (
      <Button disabled className="flex items-center gap-1">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading...</span>
      </Button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono font-medium">{truncatedAddress}</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDisconnect}
          className="flex items-center gap-1 hover:bg-red-50"
          disabled={isReconnecting}
        >
          {isReconnecting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          <span>{isReconnecting ? 'Disconnecting...' : 'Disconnect'}</span>
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleConnect}
      className="flex items-center gap-1 bg-primary hover:bg-primary/90"
      disabled={isConnecting}
    >
      {isConnecting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Wallet className="h-4 w-4" />
      )}
      <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
    </Button>
  );
}
