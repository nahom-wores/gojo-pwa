import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

// Property Card Skeleton for loading states
function PropertyCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="aspect-[4/3] w-full" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />
        
        {/* Location */}
        <Skeleton className="h-4 w-1/2" />
        
        {/* Stats row */}
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export { Skeleton, PropertyCardSkeleton };
