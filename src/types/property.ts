/**
 * Property-related type definitions for Gojo Rental
 * These types define the structure of property data throughout the application
 */

export type PropertyType = 
  | 'residential' 
  | 'apartment' 
  | 'villa' 
  | 'office' 
  | 'commercial' 
  | 'warehouse';

export type PropertyStatus = 'available' | 'rented' | 'pending';

export type FurnishingStatus = 'furnished' | 'semi-furnished' | 'unfurnished';

export interface PropertyAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface PropertyLocation {
  address: string;
  city: string;
  subCity: string;
  woreda?: string;
  latitude?: number;
  longitude?: number;
}

export interface PropertyOwner {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
  email?: string;
  verified: boolean;
  responseRate?: number;
  responseTime?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  priceUnit: 'month' | 'year';
  deposit?: number;
  bedrooms: number;
  bathrooms: number;
  area: number; // in square meters
  furnishing: FurnishingStatus;
  images: string[];
  amenities: string[];
  location: PropertyLocation;
  owner: PropertyOwner;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  views: number;
  savedCount: number;
}

export interface PropertyFilter {
  type?: PropertyType | 'all';
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number | 'any';
  bathrooms?: number | 'any';
  furnishing?: FurnishingStatus | 'any';
  city?: string;
  subCity?: string;
  amenities?: string[];
}

export interface SearchParams {
  query?: string;
  location?: string;
  filters?: PropertyFilter;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
  page?: number;
  limit?: number;
}
