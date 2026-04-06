import type { CSSProperties } from 'react';

export const initialPageBackgroundStyle: CSSProperties = {
  background: `
    radial-gradient(ellipse 90% 70% at -5% 10%, rgba(124, 58, 237, 0.30) 0%, transparent 65%),
    radial-gradient(ellipse 55% 55% at 105% 85%, rgba(109, 40, 217, 0.22) 0%, transparent 65%),
    radial-gradient(ellipse 45% 40% at 55% 105%, rgba(139, 92, 246, 0.12) 0%, transparent 60%),
    radial-gradient(ellipse 30% 25% at 80% 5%, rgba(167, 139, 250, 0.10) 0%, transparent 60%),
    hsl(var(--background))
  `,
};

export const initialPageNoiseOverlayStyle: CSSProperties = {
  backgroundImage:
    'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
};
