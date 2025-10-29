'use client';

import { ReactNode } from 'react';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ModalsProvider>
      <Notifications position="top-right" zIndex={1000} />
      {children}
    </ModalsProvider>
  );
}
