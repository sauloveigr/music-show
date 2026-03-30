import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ShowFormSkeleton: React.FC = () => {
  return (
    <div className="space-y-6" aria-busy="true" role="status">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-[100px] w-full rounded-lg" />
      </div>
      <div className="flex flex-col gap-3 pt-4 sm:flex-row">
        <Skeleton className="h-11 flex-1 rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg sm:w-28" />
      </div>
    </div>
  );
};

export default ShowFormSkeleton;
