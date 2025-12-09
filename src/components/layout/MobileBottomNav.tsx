/**
 * Mobile Bottom Navigation - Airbnb/PWA Style
 * Shows different navigation items based on auth state
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, MessageCircle, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const MobileBottomNav: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const navItems = isAuthenticated
    ? [
        { icon: Search, label: 'Explore', path: '/' },
        { icon: MessageCircle, label: 'Messages', path: '/messages' },
        { icon: User, label: 'Profile', path: '/dashboard' },
      ]
    : [
        { icon: Search, label: 'Explore', path: '/' },
        { icon: LogIn, label: 'Log in', path: '/auth' },
      ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Blur background effect */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-lg border-t border-border" />
      
      {/* Safe area padding for iOS */}
      <div className="relative flex items-center justify-around px-4 py-2 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-200",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon 
                className={cn(
                  "w-6 h-6 transition-transform duration-200",
                  isActive && "scale-110"
                )} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={cn(
                "text-xs font-medium",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
