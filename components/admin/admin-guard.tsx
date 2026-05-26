'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hooks';
import { selectUser } from '@/lib/redux/slices/authSlice';
import { ROLE_ADMIN } from '@/lib/types/roles';
import { useAuthReady } from '@/hooks/useAuthReady';
import { Skeleton } from '@/components/ui/skeleton';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const { ready, awaitingHydration, isAuthenticated, hasCookie } = useAuthReady();
  const isAdmin = user?.role?.includes(ROLE_ADMIN) ?? false;

  useEffect(() => {
    if (!ready) return;

    if (!isAuthenticated && !hasCookie) {
      router.replace('/login');
      return;
    }

    if (isAuthenticated && user && !isAdmin) {
      router.replace('/courses');
    }
  }, [ready, isAuthenticated, hasCookie, isAdmin, router, user]);

  if (!ready || awaitingHydration) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-8">
        <div className="w-full max-w-md space-y-3">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
