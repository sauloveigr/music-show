import React from 'react';

import { initialPageNoiseOverlayStyle } from './initialPageBackground';

export const InitialPageNoiseOverlay: React.FC = () => (
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.03]"
    style={initialPageNoiseOverlayStyle}
  />
);
