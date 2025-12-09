/**
 * Create Property Page
 * Form for listing a new property
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Home,
  Building2,
  Castle,
  Briefcase,
  Store,
  Warehouse,
  Loader2,
  Check,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { PropertyType, FurnishingStatus } from '@/types/property';
import { amenitiesList, addisSubCities } from '@/data/mockProperties';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface FormData {
  title: string;
  description: string;
  type: PropertyType | '';
  price: string;
  priceUnit: 'month' | 'year';
  deposit: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  furnishing: FurnishingStatus | '';
  address: string;
  city: string;
  subCity: string;
  amenities: string[];
  images: File[];
}

const propertyTypes = [
  { value: 'residential', label: 'House', icon: Home },
  { value: 'apartment', label: 'Apartment', icon: Building2 },
  { value: 'villa', label: 'Villa', icon: Castle },
  { value: 'office', label: 'Office', icon: Briefcase },
  { value: 'commercial', label: 'Commercial', icon: Store },
  { value: 'warehouse', label: 'Warehouse', icon: Warehouse },
];

const furnishingOptions: { value: FurnishingStatus; label: string }[] = [
  { value: 'furnished', label: 'Fully Furnished' },
  { value: 'semi-furnished', label: 'Semi Furnished' },
  { value: 'unfurnished', label: 'Unfurnished' },
];

const CreateProperty: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    type: '',
    price: '',
    priceUnit: 'month',
    deposit: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    furnishing: '',
    address: '',
    city: 'Addis Ababa',
    subCity: '',
    amenities: [],
    images: [],
  });

  const totalSteps = 4;

  // Handle text input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle property type selection
  const handleTypeSelect = (type: PropertyType) => {
    setFormData(prev => ({ ...prev, type }));
  };

  // Handle furnishing selection
  const handleFurnishingSelect = (furnishing: FurnishingStatus) => {
    setFormData(prev => ({ ...prev, furnishing }));
  };

  // Handle amenity toggle
  const handleAmenityToggle = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (formData.images.length + files.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }

    const newImages = [...formData.images, ...files];
    setFormData(prev => ({ ...prev, images: newImages }));

    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Navigation
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Property listed successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to list property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Please Login
            </h1>
            <p className="text-muted-foreground mb-6">
              You need to be logged in to list a property
            </p>
            <Link to="/auth">
              <Button variant="default">Login</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>List Your Property - Gojo Rental</title>
        <meta name="description" content="List your property for rent on Gojo Rental. Reach thousands of potential tenants." />
      </Helmet>

      <Layout showFooter={false}>
        <div className="min-h-screen bg-secondary/30">
          {/* Header */}
          <div className="bg-card border-b border-border">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">
                    List Your Property
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Step {currentStep} of {totalSteps}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8 max-w-3xl">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 animate-fade-in">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Basic Information
                </h2>

                {/* Property Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Property Type *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {propertyTypes.map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleTypeSelect(value as PropertyType)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                          formData.type === value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        )}
                      >
                        <Icon className={cn(
                          "w-6 h-6",
                          formData.type === value ? "text-primary" : "text-muted-foreground"
                        )} />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Modern 3BR Apartment in Bole"
                    className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your property in detail..."
                    rows={4}
                    className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    required
                  />
                </div>

                {/* Furnishing */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Furnishing Status *
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {furnishingOptions.map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleFurnishingSelect(value)}
                        className={cn(
                          "px-4 py-2 rounded-full border-2 text-sm font-medium transition-all",
                          formData.furnishing === value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary/30"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Details & Pricing */}
            {currentStep === 2 && (
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 animate-fade-in">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Details & Pricing
                </h2>

                {/* Price & Deposit */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Monthly Rent (ETB) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="45000"
                      className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Deposit (ETB)
                    </label>
                    <input
                      type="number"
                      name="deposit"
                      value={formData.deposit}
                      onChange={handleInputChange}
                      placeholder="90000"
                      className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                </div>

                {/* Bedrooms, Bathrooms, Area */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      placeholder="3"
                      min="0"
                      className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      placeholder="2"
                      min="0"
                      className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Area (m²)
                    </label>
                    <input
                      type="number"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="150"
                      min="0"
                      className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Amenities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {amenitiesList.map((amenity) => (
                      <button
                        key={amenity.id}
                        type="button"
                        onClick={() => handleAmenityToggle(amenity.id)}
                        className={cn(
                          "px-3 py-1.5 rounded-full border text-sm font-medium transition-all flex items-center gap-1.5",
                          formData.amenities.includes(amenity.id)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary/30"
                        )}
                      >
                        {formData.amenities.includes(amenity.id) && (
                          <Check className="w-3.5 h-3.5" />
                        )}
                        {amenity.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 animate-fade-in">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Location
                </h2>

                {/* Sub-City */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Sub-City *
                  </label>
                  <select
                    name="subCity"
                    value={formData.subCity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  >
                    <option value="">Select Sub-City</option>
                    {addisSubCities.map((subCity) => (
                      <option key={subCity} value={subCity}>
                        {subCity}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g., Near Edna Mall, Bole Road"
                    className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 4: Photos */}
            {currentStep === 4 && (
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 animate-fade-in">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Property Photos
                </h2>
                <p className="text-muted-foreground mb-6">
                  Add up to 10 photos. The first image will be the cover photo.
                </p>

                {/* Upload Area */}
                <label className="block border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors mb-6">
                  <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-foreground font-medium mb-1">
                    Click to upload photos
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG up to 10MB each
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-2 left-2 px-2 py-1 rounded bg-foreground/80 text-background text-xs font-medium">
                            Cover
                          </span>
                        )}
                      </div>
                    ))}
                    
                    {/* Add More Button */}
                    {imagePreviews.length < 10 && (
                      <label className="aspect-square rounded-xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                        <Plus className="w-8 h-8 text-muted-foreground" />
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={handleBack}>
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              {currentStep < totalSteps ? (
                <Button type="button" onClick={handleNext}>
                  Continue
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Publishing...
                    </>
                  ) : (
                    'Publish Property'
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default CreateProperty;
