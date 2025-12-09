/**
 * Property Categories Section
 * Quick access to different property types
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Building2, 
  Castle, 
  Briefcase, 
  Store, 
  Warehouse,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  gradient: string;
}

const categories: Category[] = [
  {
    id: 'residential',
    label: 'Houses',
    description: 'Family homes & townhouses',
    icon: <Home className="w-8 h-8" />,
    count: 450,
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    id: 'apartment',
    label: 'Apartments',
    description: 'Modern living spaces',
    icon: <Building2 className="w-8 h-8" />,
    count: 890,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'villa',
    label: 'Villas',
    description: 'Luxury properties',
    icon: <Castle className="w-8 h-8" />,
    count: 120,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'office',
    label: 'Offices',
    description: 'Professional workspaces',
    icon: <Briefcase className="w-8 h-8" />,
    count: 280,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'commercial',
    label: 'Commercial',
    description: 'Retail & business spaces',
    icon: <Store className="w-8 h-8" />,
    count: 190,
    gradient: 'from-red-500 to-rose-500',
  },
  {
    id: 'warehouse',
    label: 'Warehouses',
    description: 'Storage & industrial',
    icon: <Warehouse className="w-8 h-8" />,
    count: 85,
    gradient: 'from-slate-500 to-gray-500',
  },
];

const CategorySection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 text-foreground mb-4">
            Browse by Property Type
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From cozy apartments to spacious villas, find the perfect space for your needs
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/properties?type=${category.id}`}
              className={cn(
                "group relative p-6 rounded-2xl bg-card border border-border overflow-hidden",
                "hover:shadow-lg hover:-translate-y-1 transition-all duration-300",
                "animate-slide-up"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Background gradient on hover */}
              <div 
                className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity",
                  `bg-gradient-to-br ${category.gradient}`
                )}
              />

              {/* Icon */}
              <div 
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                  "bg-gradient-to-br text-primary-foreground",
                  category.gradient
                )}
              >
                {category.icon}
              </div>

              {/* Content */}
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {category.label}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {category.description}
              </p>
              <p className="text-sm font-medium text-primary">
                {category.count} listings
              </p>

              {/* Arrow */}
              <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
