'use client';

import React from 'react';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { PiPProvider } from '@/components/shared/PiPProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PiPProvider>
        {children}
      </PiPProvider>
    </ThemeProvider>
  );
}
