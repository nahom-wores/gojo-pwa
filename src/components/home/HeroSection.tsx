/**
 * Hero Section Component for Home Page
 * Features advanced search with multiple filters
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, Building2, Briefcase, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addisSubCities } from '@/data/mockProperties';
import { cn } from '@/lib/utils';

const HeroSection: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedSubCity, setSelectedSubCity] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
  const [bedrooms, setBedrooms] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate();

  const propertyTypes = [
    { id: 'all', label: 'All', icon: Home },
    { id: 'residential', label: 'Houses', icon: Home },
    { id: 'apartment', label: 'Apartments', icon: Building2 },
    { id: 'office', label: 'Offices', icon: Briefcase },
  ];

  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '0', label: 'Studio' },
    { value: '1', label: '1 Bed' },
    { value: '2', label: '2 Beds' },
    { value: '3', label: '3 Beds' },
    { value: '4', label: '4+ Beds' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation) params.set('location', searchLocation);
    if (selectedSubCity) params.set('subCity', selectedSubCity);
    if (selectedType !== 'all') params.set('type', selectedType);
    if (priceRange.min) params.set('priceMin', priceRange.min);
    if (priceRange.max) params.set('priceMax', priceRange.max);
    if (bedrooms) params.set('bedrooms', bedrooms);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[60vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/60 to-foreground/80" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float hidden md:block" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float delay-500 hidden md:block" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-8 md:pt-0">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-sm font-medium mb-4 md:mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Ethiopia's #1 Long-Term Rental Platform
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-4 md:mb-6 animate-slide-up leading-tight">
            Find Your Perfect Home
            <span className="block text-primary mt-1 md:mt-2">in Addis Ababa</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg lg:text-xl text-primary-foreground/80 mb-6 md:mb-10 max-w-2xl mx-auto animate-slide-up delay-100 px-4">
            Discover thousands of rental properties across all subcities. Houses, apartments, offices – your next chapter starts here.
          </p>

          {/* Search Card - Hidden on mobile (using MobileSearchHeader instead) */}
          <div className="hidden md:block bg-card/95 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl max-w-3xl mx-auto animate-slide-up delay-200">
            {/* Property Type Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
              {propertyTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0",
                      selectedType === type.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {type.label}
                  </button>
                );
              })}
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="space-y-3">
              {/* Main Search Row */}
              <div className="flex flex-col md:flex-row gap-3">
                {/* SubCity Dropdown */}
                <div className="relative flex-1 md:max-w-[200px]">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <select
                    value={selectedSubCity}
                    onChange={(e) => setSelectedSubCity(e.target.value)}
                    className="w-full pl-10 pr-8 py-3 md:py-4 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground appearance-none cursor-pointer"
                  >
                    <option value="">All SubCities</option>
                    {addisSubCities.map((subCity) => (
                      <option key={subCity} value={subCity}>{subCity}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search neighborhood or address..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 md:py-4 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Search Button - Inline on desktop */}
                <Button type="submit" size="lg" className="gap-2 min-w-[140px] h-auto py-4">
                  <Search className="w-5 h-5" />
                  Search
                </Button>
              </div>

              {/* Toggle Advanced Filters */}
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-primary font-medium hover:underline flex items-center gap-1 mx-auto"
              >
                {showAdvanced ? 'Hide' : 'Show'} More Filters
                <ChevronDown className={cn("w-4 h-4 transition-transform", showAdvanced && "rotate-180")} />
              </button>

              {/* Advanced Filters */}
              {showAdvanced && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2 animate-fade-in">
                  {/* Price Min */}
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1 text-left">Min Price (ETB)</label>
                    <input
                      type="number"
                      placeholder="10,000"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-background rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground text-sm"
                    />
                  </div>

                  {/* Price Max */}
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1 text-left">Max Price (ETB)</label>
                    <input
                      type="number"
                      placeholder="100,000"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-background rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground text-sm"
                    />
                  </div>

                  {/* Bedrooms */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs text-muted-foreground mb-1 text-left">Bedrooms</label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full px-3 py-2.5 bg-background rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground text-sm appearance-none cursor-pointer"
                    >
                      {bedroomOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </form>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {['Bole', 'CMC', 'Sarbet', 'Kazanchis', 'Old Airport'].map((location) => (
                <button
                  key={location}
                  onClick={() => {
                    setSearchLocation(location);
                  }}
                  className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-16 mt-8 md:mt-12 animate-fade-in delay-300">
            {[
              { value: '2,500+', label: 'Properties Listed' },
              { value: '1,200+', label: 'Happy Tenants' },
              { value: '500+', label: 'Verified Owners' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-primary-foreground">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-primary-foreground/70 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary-foreground/50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
