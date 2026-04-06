import React from 'react';

import { initialPageBackgroundStyle } from './initialPageBackground';
import { InitialPageBrandPanel } from './InitialPageBrandPanel';
import { InitialPageLoginPanel } from './InitialPageLoginPanel';
import { InitialPageNoiseOverlay } from './InitialPageNoiseOverlay';

export const InitialPage: React.FC = () => (
  <main className="relative min-h-[100svh] overflow-hidden" style={initialPageBackgroundStyle}>
    <InitialPageNoiseOverlay />
    <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 grid-rows-[minmax(0,1fr)] px-6 py-10 md:grid-cols-2 md:gap-12 md:px-12 md:py-0 lg:px-20">
      <InitialPageBrandPanel />
      <div className="hidden md:flex">
        <InitialPageLoginPanel />
      </div>
    </div>
  </main>
);
