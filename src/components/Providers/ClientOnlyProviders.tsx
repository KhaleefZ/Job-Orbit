'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import providers that are not SSR-compatible
const ModalsProvider = dynamic(() => import('@mantine/modals').then((mod) => mod.ModalsProvider), {
  ssr: false,
});

const Notifications = dynamic(() => import('@mantine/notifications').then((mod) => mod.Notifications), {
  ssr: false,
});

interface ClientOnlyProvidersProps {
  children: ReactNode;
}

export function ClientOnlyProviders({ children }: ClientOnlyProvidersProps) {
  return (
    <ModalsProvider>
      <Notifications position="top-right" zIndex={2077} />
      {children}
    </ModalsProvider>
  );
}
