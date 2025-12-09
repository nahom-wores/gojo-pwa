/**
 * Mobile Search Modal - Full screen search with all filters
 * Airbnb-style search experience for mobile
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Search,
  MapPin,
  Home,
  Building2,
  Castle,
  Briefcase,
  Store,
  Warehouse,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyType } from '@/types/property';
import { addisSubCities } from '@/data/mockProperties';
import { cn } from '@/lib/utils';

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const propertyTypes: { value: PropertyType | 'all'; label: string; icon: React.ReactNode }[] = [
  { value: 'all', label: 'All Types', icon: <Home className="w-6 h-6" /> },
  { value: 'residential', label: 'Houses', icon: <Home className="w-6 h-6" /> },
  { value: 'apartment', label: 'Apartments', icon: <Building2 className="w-6 h-6" /> },
  { value: 'villa', label: 'Villas', icon: <Castle className="w-6 h-6" /> },
  { value: 'office', label: 'Offices', icon: <Briefcase className="w-6 h-6" /> },
  { value: 'commercial', label: 'Commercial', icon: <Store className="w-6 h-6" /> },
  { value: 'warehouse', label: 'Warehouses', icon: <Warehouse className="w-6 h-6" /> },
];

const priceRanges = [
  { label: 'Any price', min: undefined, max: undefined },
  { label: 'Under 20,000 ETB', min: undefined, max: 20000 },
  { label: '20,000 - 40,000 ETB', min: 20000, max: 40000 },
  { label: '40,000 - 60,000 ETB', min: 40000, max: 60000 },
  { label: '60,000 - 100,000 ETB', min: 60000, max: 100000 },
  { label: 'Over 100,000 ETB', min: 100000, max: undefined },
];

const bedroomOptions = [
  { label: 'Any', value: 'any' as const },
  { label: 'Studio', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4+', value: 4 },
];

const MobileSearchModal: React.FC<MobileSearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'main' | 'location' | 'price' | 'type'>('main');
  
  // Filter states
  const [selectedSubCity, setSelectedSubCity] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<PropertyType | 'all'>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min?: number; max?: number }>({});
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | 'any'>('any');

  if (!isOpen) return null;

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedSubCity) params.set('subCity', selectedSubCity);
    if (selectedType !== 'all') params.set('type', selectedType);
    if (selectedPriceRange.min) params.set('priceMin', selectedPriceRange.min.toString());
    if (selectedPriceRange.max) params.set('priceMax', selectedPriceRange.max.toString());
    if (selectedBedrooms !== 'any') params.set('bedrooms', selectedBedrooms.toString());
    
    navigate(`/properties?${params.toString()}`);
    onClose();
  };

  const handleClear = () => {
    setSelectedSubCity(undefined);
    setSelectedType('all');
    setSelectedPriceRange({});
    setSelectedBedrooms('any');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedSubCity) count++;
    if (selectedType !== 'all') count++;
    if (selectedPriceRange.min || selectedPriceRange.max) count++;
    if (selectedBedrooms !== 'any') count++;
    return count;
  };

  // Sub-section views
  const renderLocationSection = () => (
    <div className="animate-slide-up">
      <div className="sticky top-0 bg-background z-10 pb-4">
        <button 
          onClick={() => setActiveSection('main')}
          className="flex items-center gap-2 text-primary font-medium mb-4"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back
        </button>
        <h2 className="text-2xl font-bold text-foreground">Where in Addis?</h2>
        <p className="text-muted-foreground mt-1">Select a sub-city</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        {addisSubCities.map((subCity) => (
          <button
            key={subCity}
            onClick={() => {
              setSelectedSubCity(subCity);
              setActiveSection('main');
            }}
            className={cn(
              "p-4 rounded-2xl border-2 text-left transition-all",
              selectedSubCity === subCity
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30"
            )}
          >
            <MapPin className={cn(
              "w-5 h-5 mb-2",
              selectedSubCity === subCity ? "text-primary" : "text-muted-foreground"
            )} />
            <span className="font-medium text-foreground">{subCity}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderPriceSection = () => (
    <div className="animate-slide-up">
      <div className="sticky top-0 bg-background z-10 pb-4">
        <button 
          onClick={() => setActiveSection('main')}
          className="flex items-center gap-2 text-primary font-medium mb-4"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back
        </button>
        <h2 className="text-2xl font-bold text-foreground">Price range</h2>
        <p className="text-muted-foreground mt-1">Monthly rent in ETB</p>
      </div>
      
      <div className="space-y-3 mt-4">
        {priceRanges.map((range, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedPriceRange({ min: range.min, max: range.max });
              setActiveSection('main');
            }}
            className={cn(
              "w-full p-4 rounded-2xl border-2 text-left transition-all",
              selectedPriceRange.min === range.min && selectedPriceRange.max === range.max
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30"
            )}
          >
            <span className="font-medium text-foreground">{range.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderTypeSection = () => (
    <div className="animate-slide-up">
      <div className="sticky top-0 bg-background z-10 pb-4">
        <button 
          onClick={() => setActiveSection('main')}
          className="flex items-center gap-2 text-primary font-medium mb-4"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back
        </button>
        <h2 className="text-2xl font-bold text-foreground">Property type</h2>
        <p className="text-muted-foreground mt-1">What are you looking for?</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        {propertyTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => {
              setSelectedType(type.value);
              setActiveSection('main');
            }}
            className={cn(
              "p-4 rounded-2xl border-2 text-left transition-all",
              selectedType === type.value
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30"
            )}
          >
            <div className={cn(
              "mb-2",
              selectedType === type.value ? "text-primary" : "text-muted-foreground"
            )}>
              {type.icon}
            </div>
            <span className="font-medium text-foreground">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderMainSection = () => (
    <div className="space-y-4">
      {/* Location Card */}
      <button
        onClick={() => setActiveSection('location')}
        className="w-full p-5 bg-card rounded-2xl border border-border shadow-sm text-left hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Where</p>
            <p className="text-lg font-semibold text-foreground mt-1">
              {selectedSubCity || 'Search destinations'}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </button>

      {/* Property Type Card */}
      <button
        onClick={() => setActiveSection('type')}
        className="w-full p-5 bg-card rounded-2xl border border-border shadow-sm text-left hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">What</p>
            <p className="text-lg font-semibold text-foreground mt-1">
              {selectedType === 'all' ? 'Any property type' : propertyTypes.find(t => t.value === selectedType)?.label}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </button>

      {/* Price Range Card */}
      <button
        onClick={() => setActiveSection('price')}
        className="w-full p-5 bg-card rounded-2xl border border-border shadow-sm text-left hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</p>
            <p className="text-lg font-semibold text-foreground mt-1">
              {selectedPriceRange.min || selectedPriceRange.max
                ? priceRanges.find(r => r.min === selectedPriceRange.min && r.max === selectedPriceRange.max)?.label
                : 'Any price'
              }
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </button>

      {/* Bedrooms */}
      <div className="p-5 bg-card rounded-2xl border border-border shadow-sm">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Bedrooms</p>
        <div className="flex flex-wrap gap-2">
          {bedroomOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => setSelectedBedrooms(option.value)}
              className={cn(
                "px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-all",
                selectedBedrooms === option.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/30 text-foreground"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-background md:hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          
          {activeSection === 'main' && getActiveFiltersCount() > 0 && (
            <button
              onClick={handleClear}
              className="text-sm font-medium text-primary hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto h-[calc(100vh-140px)] p-4 pb-8">
        {activeSection === 'main' && renderMainSection()}
        {activeSection === 'location' && renderLocationSection()}
        {activeSection === 'price' && renderPriceSection()}
        {activeSection === 'type' && renderTypeSection()}
      </div>

      {/* Footer with Search Button */}
      {activeSection === 'main' && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-lg border-t border-border pb-safe">
          <Button
            onClick={handleSearch}
            size="lg"
            className="w-full h-14 text-base font-semibold gap-2 rounded-xl"
          >
            <Search className="w-5 h-5" />
            Search
            {getActiveFiltersCount() > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-primary-foreground/20 rounded-full text-sm">
                {getActiveFiltersCount()}
              </span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MobileSearchModal;
