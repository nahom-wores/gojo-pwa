/**
 * Call-to-Action Section
 * Encourages property owners to list their properties
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection: React.FC = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Reach Thousands',
      description: 'Get your property in front of verified renters actively looking for long-term rentals.',
    },
    {
      icon: Shield,
      title: 'Verified Renters',
      description: 'We verify all users to ensure safe and trustworthy transactions.',
    },
    {
      icon: TrendingUp,
      title: 'Maximize Earnings',
      description: 'Set competitive prices with our market insights and analytics tools.',
    },
    {
      icon: Zap,
      title: 'Quick Listing',
      description: 'List your property in under 5 minutes with our simple form.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-foreground relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="heading-2 text-background mb-6">
              Own a Property?
              <span className="block text-primary mt-2">Start Earning Today</span>
            </h2>
            <p className="text-background/70 text-lg mb-8 leading-relaxed">
              Join thousands of property owners on Gojo Rental. List your residential, commercial, or office space and connect with quality tenants looking for long-term rentals.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-background mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-background/60">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link to="/properties/create">
              <Button variant="hero" size="xl" className="gap-2">
                List Your Property Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Right - Stats Card */}
          <div className="relative">
            <div className="bg-card rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Why Owners Love Us
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                  <div className="text-4xl font-bold text-primary">95%</div>
                  <div>
                    <div className="font-semibold text-foreground">Occupancy Rate</div>
                    <div className="text-sm text-muted-foreground">Properties rented within 30 days</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                  <div className="text-4xl font-bold text-primary">500+</div>
                  <div>
                    <div className="font-semibold text-foreground">Active Owners</div>
                    <div className="text-sm text-muted-foreground">Successfully earning rental income</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                  <div className="text-4xl font-bold text-primary">0</div>
                  <div>
                    <div className="font-semibold text-foreground">Listing Fees</div>
                    <div className="text-sm text-muted-foreground">Free to list your property</div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-muted-foreground italic mb-4">
                  "Listed my apartment on Monday, had 10 inquiries by Friday, and signed a lease the following week. Incredible!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                    M
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Meseret A.</div>
                    <div className="text-sm text-muted-foreground">Property Owner, Bole</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10 animate-float" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/10 rounded-xl -z-10 animate-float delay-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
