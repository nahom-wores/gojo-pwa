/**
 * Property Detail Page
 * Shows comprehensive property information, gallery, and contact options
 */

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Eye,
  BadgeCheck,
  Phone,
  MessageCircle,
  Wifi,
  Car,
  Shield,
  Dumbbell,
  Waves,
  Flower2,
  Zap,
  Droplets,
  ArrowUpDown,
  DoorOpen,
  Users,
  Package,
  BedDouble,
  X,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { mockProperties, amenitiesList } from '@/data/mockProperties';
import { cn } from '@/lib/utils';

// Map amenity icons
const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-5 h-5" />,
  parking: <Car className="w-5 h-5" />,
  security: <Shield className="w-5 h-5" />,
  elevator: <ArrowUpDown className="w-5 h-5" />,
  gym: <Dumbbell className="w-5 h-5" />,
  pool: <Waves className="w-5 h-5" />,
  garden: <Flower2 className="w-5 h-5" />,
  balcony: <DoorOpen className="w-5 h-5" />,
  generator: <Zap className="w-5 h-5" />,
  'water-tank': <Droplets className="w-5 h-5" />,
  'meeting-room': <Users className="w-5 h-5" />,
  storage: <Package className="w-5 h-5" />,
  'staff-quarters': <BedDouble className="w-5 h-5" />,
};

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Find property by ID
  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Property Not Found
            </h1>
            <Link to="/properties">
              <Button variant="default">Browse Properties</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      <Helmet>
        <title>{property.title} - Gojo Rental</title>
        <meta name="description" content={property.description.substring(0, 160)} />
      </Helmet>

      <Layout>
        <div className="min-h-screen bg-background">
          {/* Image Gallery Header */}
          <div className="relative">
            {/* Main Image */}
            <div 
              className="relative h-[40vh] md:h-[60vh] cursor-pointer"
              onClick={() => setIsGalleryOpen(true)}
            >
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />

              {/* Navigation arrows */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(prev => 
                        prev === 0 ? property.images.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(prev => 
                        prev === property.images.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium">
                {currentImageIndex + 1} / {property.images.length}
              </div>

              {/* Action buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSaved(!isSaved);
                  }}
                  className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                >
                  <Heart className={cn("w-5 h-5", isSaved && "fill-destructive text-destructive")} />
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="hidden md:flex gap-2 p-2 bg-background overflow-x-auto">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all",
                    index === currentImageIndex
                      ? "border-primary"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Title & Meta */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="badge-primary capitalize">{property.type}</span>
                    <span className="badge-secondary capitalize">{property.furnishing}</span>
                    {property.featured && (
                      <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <h1 className="heading-3 text-foreground mb-3">{property.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span>{property.location.address}, {property.location.subCity}, {property.location.city}</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {property.bedrooms > 0 && (
                    <div className="p-4 rounded-xl bg-card border border-border text-center">
                      <Bed className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold text-foreground">{property.bedrooms}</div>
                      <div className="text-sm text-muted-foreground">Bedrooms</div>
                    </div>
                  )}
                  <div className="p-4 rounded-xl bg-card border border-border text-center">
                    <Bath className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold text-foreground">{property.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border text-center">
                    <Maximize className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold text-foreground">{property.area} m²</div>
                    <div className="text-sm text-muted-foreground">Area</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border text-center">
                    <Eye className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold text-foreground">{property.views}</div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">About This Property</h2>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </div>

                {/* Amenities */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">Amenities & Features</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {property.amenities.map((amenityId) => {
                      const amenity = amenitiesList.find(a => a.id === amenityId);
                      if (!amenity) return null;
                      return (
                        <div
                          key={amenityId}
                          className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
                        >
                          <div className="text-primary">
                            {amenityIcons[amenityId] || <Shield className="w-5 h-5" />}
                          </div>
                          <span className="text-foreground font-medium">{amenity.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">Location</h2>
                  <div className="aspect-video rounded-xl bg-secondary flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">Map view coming soon</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {property.location.address}, {property.location.subCity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Price Card */}
                  <div className="bg-card rounded-2xl border border-border p-6 shadow-md">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-foreground">
                        {formatPrice(property.price)}
                      </span>
                      <span className="text-muted-foreground">/{property.priceUnit}</span>
                    </div>
                    {property.deposit && (
                      <p className="text-sm text-muted-foreground mb-6">
                        Deposit: {formatPrice(property.deposit)}
                      </p>
                    )}

                    <div className="space-y-3">
                      <Button variant="default" className="w-full gap-2">
                        <Phone className="w-4 h-4" />
                        Call Owner
                      </Button>
                      <Button variant="outline" className="w-full gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Send Message
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Listed on {formatDate(property.createdAt)}
                    </p>
                  </div>

                  {/* Owner Card */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-4">Listed By</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-xl font-bold text-primary">
                        {property.owner.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-foreground">
                            {property.owner.name}
                          </span>
                          {property.owner.verified && (
                            <BadgeCheck className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        {property.owner.responseRate && (
                          <p className="text-sm text-muted-foreground">
                            {property.owner.responseRate}% response rate
                          </p>
                        )}
                      </div>
                    </div>
                    {property.owner.responseTime && (
                      <p className="text-sm text-muted-foreground">
                        Typically responds {property.owner.responseTime}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-screen Gallery Modal */}
        {isGalleryOpen && (
          <div className="fixed inset-0 z-50 bg-foreground flex items-center justify-center">
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors z-10"
            >
              <X className="w-6 h-6 text-background" />
            </button>
            <button
              onClick={() => setCurrentImageIndex(prev => 
                prev === 0 ? property.images.length - 1 : prev - 1
              )}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8 text-background" />
            </button>
            <button
              onClick={() => setCurrentImageIndex(prev => 
                prev === property.images.length - 1 ? 0 : prev + 1
              )}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
            >
              <ChevronRight className="w-8 h-8 text-background" />
            </button>
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-background text-sm">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default PropertyDetail;
