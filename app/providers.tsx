'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { UserProvider } from '@/contexts/UserContext';
import { Web3Provider } from '@/components/providers/web3-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Web3Provider>
      <SessionProvider>
        <UserProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </UserProvider>
      </SessionProvider>
    </Web3Provider>
  );
}
