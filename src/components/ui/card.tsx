import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section' | 'aside';
}

const Card = React.forwardRef<HTMLElement, CardProps>(
  ({ className, as: Component = 'article', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    />
  )
);

Card.displayName = 'Card';

export { Card };
