/**
 * Home Page - Main landing page for Gojo Rental
 * Features hero, search, categories, featured listings, and CTA sections
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import HowItWorks from '@/components/home/HowItWorks';
import CTASection from '@/components/home/CTASection';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Gojo Rental - Ethiopia's Premier Long-Term Property Rental Platform</title>
        <meta 
          name="description" 
          content="Find your perfect long-term rental in Ethiopia. Browse apartments, houses, offices, and commercial spaces. List your property and connect with verified tenants." 
        />
        <meta property="og:title" content="Gojo Rental - Find Your Perfect Long-Term Home" />
        <meta property="og:description" content="Ethiopia's premier platform for long-term property rentals. Discover quality homes, apartments, and offices." />
      </Helmet>

      <Layout>
        <HeroSection />
        <CategorySection />
        <FeaturedProperties />
        <HowItWorks />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
