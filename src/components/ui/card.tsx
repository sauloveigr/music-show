import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section' | 'aside';
}

const Card = React.forwardRef<HTMLElement, CardProps>(
  ({ className, as: Component = 'article', ...props }, ref) => (
    <Component
      ref={ref as React.Ref<any>}
      className={cn(
        'rounded-2xl border border-white/10 bg-gradient-to-br from-gray-800/90 to-gray-900/95 text-card-foreground shadow-xl shadow-black/20 backdrop-blur-sm',
        className
      )}
      {...props}
    />
  )
);

Card.displayName = 'Card';

export { Card };
