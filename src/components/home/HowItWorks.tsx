/**
 * How It Works Section
 * Explains the rental process for renters and owners
 */

import React, { useState } from 'react';
import { 
  Search, 
  MessageCircle, 
  KeyRound,
  Home,
  Camera,
  Users,
  BadgeCheck,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'renter' | 'owner'>('renter');

  const renterSteps = [
    {
      icon: Search,
      title: 'Search Properties',
      description: 'Browse through our extensive collection of verified properties. Use filters to find exactly what you need.',
    },
    {
      icon: MessageCircle,
      title: 'Contact Owner',
      description: 'Found a property you like? Message the owner directly to schedule a viewing or ask questions.',
    },
    {
      icon: KeyRound,
      title: 'Move In',
      description: 'Complete the agreement, pay your deposit, and get your keys. Welcome to your new home!',
    },
  ];

  const ownerSteps = [
    {
      icon: Camera,
      title: 'List Your Property',
      description: 'Create a listing with photos and details. Our easy form makes it simple to showcase your property.',
    },
    {
      icon: Users,
      title: 'Connect with Renters',
      description: 'Receive inquiries from interested renters. Use our messaging system to communicate securely.',
    },
    {
      icon: BadgeCheck,
      title: 'Close the Deal',
      description: 'Choose your ideal tenant, finalize the agreement, and start earning rental income.',
    },
  ];

  const steps = activeTab === 'renter' ? renterSteps : ownerSteps;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 text-foreground mb-4">
            How Gojo Rental Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Whether you're looking for a place to rent or want to list your property, we make it simple
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex rounded-full bg-secondary p-1">
            <button
              onClick={() => setActiveTab('renter')}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all",
                activeTab === 'renter'
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              I'm a Renter
            </button>
            <button
              onClick={() => setActiveTab('owner')}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all",
                activeTab === 'owner'
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              I'm an Owner
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines (desktop only) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className={cn(
                    "relative text-center animate-slide-up",
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Step number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center z-10">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-secondary flex items-center justify-center mb-6 mt-4 relative">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
