/**
 * Mobile Search Header - PWA Style
 * Compact search bar that opens full search modal when tapped
 */

import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileSearchHeaderProps {
  onOpenSearch: () => void;
  className?: string;
}

const MobileSearchHeader: React.FC<MobileSearchHeaderProps> = ({ 
  onOpenSearch,
  className 
}) => {
  return (
    <div className={cn(
      "sticky top-0 z-40 md:hidden bg-background/95 backdrop-blur-lg border-b border-border",
      className
    )}>
      <div className="px-4 py-3">
        {/* Search Button - Mimics search bar */}
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center gap-3 p-3 bg-secondary hover:bg-secondary/80 rounded-full border border-border shadow-sm transition-all active:scale-[0.98]"
        >
          <Search className="w-5 h-5 text-primary" />
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-foreground">Where to?</p>
            <p className="text-xs text-muted-foreground">
              Anywhere · Any price · Any type
            </p>
          </div>
          <div className="p-2 bg-background rounded-full border border-border">
            <SlidersHorizontal className="w-4 h-4 text-foreground" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default MobileSearchHeader;
