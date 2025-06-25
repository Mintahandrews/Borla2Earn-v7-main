'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useUser, UserProfile } from '@/hooks/useUser';
import { Session } from 'next-auth';

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<UserProfile>) => Promise<UserProfile>;
  isAuthenticated: boolean;
  session: Session | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const user = useUser();

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
