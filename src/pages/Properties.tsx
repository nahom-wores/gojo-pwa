/**
 * Property Listing Page
 * Displays searchable and filterable property listings with pagination
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SlidersHorizontal, Grid, List, ChevronDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyFilters from '@/components/property/PropertyFilters';
import { Button } from '@/components/ui/button';
import { PropertyCardSkeleton } from '@/components/ui/skeleton';
import { PropertyPagination } from '@/components/ui/pagination';
import { mockProperties } from '@/data/mockProperties';
import { PropertyFilter, Property } from '@/types/property';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Bedrooms' },
];

const ITEMS_PER_PAGE = 12;

const Properties: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Initialize filters from URL params
  const [filters, setFilters] = useState<PropertyFilter>(() => {
    const type = searchParams.get('type') as PropertyFilter['type'];
    const subCity = searchParams.get('subCity') || undefined;
    const priceMin = searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined;
    const priceMax = searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined;
    const bedrooms = searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined;
    
    return {
      type: type || 'all',
      subCity,
      priceMin,
      priceMax,
      bedrooms,
    };
  });

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [filters, sortBy]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = [...mockProperties];

    // Apply type filter
    if (filters.type && filters.type !== 'all') {
      result = result.filter(p => p.type === filters.type);
    }

    // Apply price filters
    if (filters.priceMin !== undefined) {
      result = result.filter(p => p.price >= filters.priceMin!);
    }
    if (filters.priceMax !== undefined) {
      result = result.filter(p => p.price <= filters.priceMax!);
    }

    // Apply bedroom filter
    if (filters.bedrooms !== undefined && filters.bedrooms !== 'any') {
      if (filters.bedrooms >= 4) {
        result = result.filter(p => p.bedrooms >= 4);
      } else {
        result = result.filter(p => p.bedrooms === filters.bedrooms);
      }
    }

    // Apply sub-city filter
    if (filters.subCity) {
      result = result.filter(p => p.location.subCity === filters.subCity);
    }

    // Apply search query
    const query = searchParams.get('q') || searchParams.get('location');
    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.location.subCity.toLowerCase().includes(lowerQuery) ||
        p.location.city.toLowerCase().includes(lowerQuery) ||
        p.location.address.toLowerCase().includes(lowerQuery)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      case 'newest':
      default:
        result.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return result;
  }, [filters, sortBy, searchParams]);

  // Paginated properties
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.type && filters.type !== 'all') count++;
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) count++;
    if (filters.bedrooms !== undefined && filters.bedrooms !== 'any') count++;
    if (filters.subCity) count++;
    return count;
  }, [filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of listings
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Browse Properties - Gojo Rental</title>
        <meta 
          name="description" 
          content="Browse apartments, houses, offices, and commercial spaces for long-term rent in Ethiopia. Filter by price, location, and amenities." 
        />
      </Helmet>

      <Layout showMobileSearch={false}>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <div className="bg-card border-b border-border sticky top-0 md:top-20 z-30">
            <div className="container mx-auto px-4 py-3 md:py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                {/* Results count */}
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-foreground">
                    Available Properties
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {filteredProperties.length} properties found
                    {filters.subCity && ` in ${filters.subCity}`}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 md:gap-3">
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    onClick={() => setIsFiltersOpen(true)}
                    className="md:hidden gap-2 flex-1"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>

                  {/* Sort Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2 flex-1 md:flex-none">
                        <span className="hidden sm:inline">Sort:</span>
                        <span className="truncate max-w-[100px] sm:max-w-none">
                          {sortOptions.find(o => o.value === sortBy)?.label}
                        </span>
                        <ChevronDown className="w-4 h-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card">
                      {sortOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => setSortBy(option.value)}
                          className={cn(
                            "cursor-pointer",
                            sortBy === option.value && "bg-secondary"
                          )}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex rounded-lg border border-border p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={cn(
                        "p-2 rounded-md transition-colors",
                        viewMode === 'grid' 
                          ? "bg-secondary text-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      aria-label="Grid view"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={cn(
                        "p-2 rounded-md transition-colors",
                        viewMode === 'list' 
                          ? "bg-secondary text-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      aria-label="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-4 md:py-6">
            <div className="flex gap-6 md:gap-8">
              {/* Filters Sidebar */}
              <PropertyFilters
                filters={filters}
                onFilterChange={setFilters}
                isOpen={isFiltersOpen}
                onClose={() => setIsFiltersOpen(false)}
              />

              {/* Properties Grid */}
              <div className="flex-1">
                {isLoading ? (
                  // Loading skeletons
                  <div 
                    className={cn(
                      "grid gap-4 md:gap-6",
                      viewMode === 'grid' 
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                        : "grid-cols-1"
                    )}
                  >
                    {Array.from({ length: 6 }).map((_, index) => (
                      <PropertyCardSkeleton key={index} />
                    ))}
                  </div>
                ) : paginatedProperties.length > 0 ? (
                  <>
                    <div 
                      className={cn(
                        "grid gap-4 md:gap-6",
                        viewMode === 'grid' 
                          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                          : "grid-cols-1"
                      )}
                    >
                      {paginatedProperties.map((property, index) => (
                        <div
                          key={property.id}
                          className="animate-fade-in"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <PropertyCard property={property} />
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-8 pt-6 border-t border-border">
                        <PropertyPagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                          totalItems={filteredProperties.length}
                          itemsPerPage={ITEMS_PER_PAGE}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  // Empty state
                  <div className="text-center py-12 md:py-16">
                    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-full bg-secondary flex items-center justify-center">
                      <SlidersHorizontal className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                      No properties found
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      No properties match your filters. Try adjusting your criteria to see more results.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setFilters({})}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Properties;
