/**
 * Main layout wrapper component
 * Provides consistent structure with Navbar, Footer, and mobile navigation
 */

import React, { ReactNode, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import MobileSearchHeader from './MobileSearchHeader';
import MobileSearchModal from './MobileSearchModal';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
  showMobileSearch?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showFooter = true,
  showMobileSearch = true 
}) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Desktop Navbar - Hidden on mobile */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      
      {/* Mobile Search Header */}
      {showMobileSearch && (
        <MobileSearchHeader onOpenSearch={() => setIsSearchModalOpen(true)} />
      )}
      
      {/* Mobile Search Modal */}
      <MobileSearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
      
      {/* Main Content - Add bottom padding for mobile nav */}
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      
      {/* Footer - Hidden on mobile */}
      {showFooter && (
        <div className="hidden md:block">
          <Footer />
        </div>
      )}
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
