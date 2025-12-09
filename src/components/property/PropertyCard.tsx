/**
 * Property Card Component
 * Displays property information in a card format for listings
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  ChevronLeft, 
  ChevronRight,
  BadgeCheck
} from 'lucide-react';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, className }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // Format price in Ethiopian Birr
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <Link 
      to={`/properties/${property.id}`}
      className={cn(
        "group block bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      {/* Image Gallery */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {property.images.map((_, index) => (
              <span
                key={index}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  index === currentImageIndex 
                    ? "bg-background" 
                    : "bg-background/50"
                )}
              />
            ))}
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          aria-label={isSaved ? "Remove from saved" : "Save property"}
        >
          <Heart 
            className={cn(
              "w-5 h-5 transition-colors",
              isSaved ? "fill-destructive text-destructive" : "text-foreground"
            )} 
          />
        </button>

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            Featured
          </div>
        )}

        {/* Property Type Badge */}
        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium capitalize">
          {property.type}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-xl font-bold text-foreground">
            {formatPrice(property.price)}
          </span>
          <span className="text-muted-foreground text-sm">
            /{property.priceUnit}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-1">
            {property.location.subCity}, {property.location.city}
          </span>
        </div>

        {/* Property Features */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            <span>{property.area} m²</span>
          </div>
        </div>

        {/* Owner Info */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
            {property.owner.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-foreground truncate">
                {property.owner.name}
              </span>
              {property.owner.verified && (
                <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
