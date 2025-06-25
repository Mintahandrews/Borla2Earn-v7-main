import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
  tokens: number;
  walletAddress: string | null;
  createdAt: Date;
}

export function useUser() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/profile');
          if (!response.ok) {
            throw new Error('Failed to fetch user profile');
          }
          const userData = await response.json();
          setUser(userData);
        } catch (err) {
          console.error('Error fetching user:', err);
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      } else if (status === 'unauthenticated') {
        setLoading(false);
      }
    };

    fetchUser();
  }, [status]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    updateProfile,
    isAuthenticated: status === 'authenticated',
    session,
  };
}
