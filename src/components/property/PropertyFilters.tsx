/**
 * Property Filters Component
 * Sidebar/modal filters for property search
 */

import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  X, 
  ChevronDown,
  Home,
  Building2,
  Castle,
  Briefcase,
  Store,
  Warehouse
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyFilter, PropertyType } from '@/types/property';
import { addisSubCities } from '@/data/mockProperties';
import { cn } from '@/lib/utils';

interface PropertyFiltersProps {
  filters: PropertyFilter;
  onFilterChange: (filters: PropertyFilter) => void;
  isOpen: boolean;
  onClose: () => void;
}

const propertyTypes: { value: PropertyType | 'all'; label: string; icon: React.ReactNode }[] = [
  { value: 'all', label: 'All Types', icon: <Home className="w-5 h-5" /> },
  { value: 'residential', label: 'Houses', icon: <Home className="w-5 h-5" /> },
  { value: 'apartment', label: 'Apartments', icon: <Building2 className="w-5 h-5" /> },
  { value: 'villa', label: 'Villas', icon: <Castle className="w-5 h-5" /> },
  { value: 'office', label: 'Offices', icon: <Briefcase className="w-5 h-5" /> },
  { value: 'commercial', label: 'Commercial', icon: <Store className="w-5 h-5" /> },
  { value: 'warehouse', label: 'Warehouses', icon: <Warehouse className="w-5 h-5" /> },
];

const priceRanges = [
  { label: 'Any', min: undefined, max: undefined },
  { label: 'Under 20,000', min: undefined, max: 20000 },
  { label: '20,000 - 40,000', min: 20000, max: 40000 },
  { label: '40,000 - 60,000', min: 40000, max: 60000 },
  { label: '60,000 - 100,000', min: 60000, max: 100000 },
  { label: 'Over 100,000', min: 100000, max: undefined },
];

const bedroomOptions = [
  { label: 'Any', value: 'any' as const },
  { label: 'Studio', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4+', value: 4 },
];

const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  onFilterChange,
  isOpen,
  onClose,
}) => {
  const [localFilters, setLocalFilters] = useState<PropertyFilter>(filters);

  const handleTypeChange = (type: PropertyType | 'all') => {
    setLocalFilters(prev => ({ ...prev, type }));
  };

  const handlePriceChange = (min?: number, max?: number) => {
    setLocalFilters(prev => ({ ...prev, priceMin: min, priceMax: max }));
  };

  const handleBedroomChange = (value: number | 'any') => {
    setLocalFilters(prev => ({ ...prev, bedrooms: value }));
  };

  const handleSubCityChange = (subCity: string) => {
    setLocalFilters(prev => ({ 
      ...prev, 
      subCity: prev.subCity === subCity ? undefined : subCity 
    }));
  };

  const handleApply = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const handleReset = () => {
    const emptyFilters: PropertyFilter = {};
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Property Type */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Property Type</h4>
        <div className="grid grid-cols-2 gap-2">
          {propertyTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => handleTypeChange(type.value)}
              className={cn(
                "flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left",
                localFilters.type === type.value
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/30 text-foreground"
              )}
            >
              {type.icon}
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Price Range (ETB/month)</h4>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <button
              key={index}
              onClick={() => handlePriceChange(range.min, range.max)}
              className={cn(
                "w-full p-3 rounded-xl border-2 text-left text-sm font-medium transition-all",
                localFilters.priceMin === range.min && localFilters.priceMax === range.max
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/30 text-foreground"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Bedrooms</h4>
        <div className="flex flex-wrap gap-2">
          {bedroomOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => handleBedroomChange(option.value)}
              className={cn(
                "px-4 py-2 rounded-full border-2 text-sm font-medium transition-all",
                localFilters.bedrooms === option.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/30 text-foreground"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-City (Addis Ababa) */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Sub-City</h4>
        <div className="flex flex-wrap gap-2">
          {addisSubCities.map((subCity) => (
            <button
              key={subCity}
              onClick={() => handleSubCityChange(subCity)}
              className={cn(
                "px-3 py-1.5 rounded-full border text-sm transition-all",
                localFilters.subCity === subCity
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/30 text-foreground"
              )}
            >
              {subCity}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex-1"
        >
          Reset All
        </Button>
        <Button
          variant="default"
          onClick={handleApply}
          className="flex-1"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  // Mobile: Full-screen modal
  if (isOpen) {
    return (
      <>
        {/* Mobile Modal */}
        <div className="fixed inset-0 z-50 bg-background md:hidden overflow-y-auto">
          <div className="sticky top-0 flex items-center justify-between p-4 border-b border-border bg-background">
            <h3 className="text-lg font-semibold">Filters</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            {filterContent}
          </div>
        </div>

        {/* Desktop: Sidebar */}
        <div className="hidden md:block w-80 flex-shrink-0">
          <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
            </div>
            {filterContent}
          </div>
        </div>
      </>
    );
  }

  // Desktop: Always visible sidebar
  return (
    <div className="hidden md:block w-80 flex-shrink-0">
      <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Filters</h3>
          <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
        </div>
        {filterContent}
      </div>
    </div>
  );
};

export default PropertyFilters;
