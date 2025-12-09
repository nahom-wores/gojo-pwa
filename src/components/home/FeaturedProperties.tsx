/**
 * Featured Properties Section
 * Showcases highlighted properties on the home page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/property/PropertyCard';
import { mockProperties } from '@/data/mockProperties';

const FeaturedProperties: React.FC = () => {
  // Get featured properties (limit to 6)
  const featuredProperties = mockProperties.filter(p => p.featured).slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="heading-2 text-foreground mb-2">
              Featured Properties
            </h2>
            <p className="text-muted-foreground text-lg">
              Hand-picked properties by our team for exceptional value
            </p>
          </div>
          <Link to="/properties?featured=true">
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property, index) => (
            <div
              key={property.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for?
          </p>
          <Link to="/properties">
            <Button variant="default" size="lg" className="gap-2">
              Explore All Properties
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
