'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated' && requiredRole && session.user.role !== requiredRole) {
      router.push('/unauthorized');
    }
  }, [status, router, requiredRole, session]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (status === 'unauthenticated' || (requiredRole && session?.user.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
