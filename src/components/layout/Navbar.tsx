/**
 * Main navigation bar component for Gojo Rental
 * Includes logo, search, auth buttons, and list property CTA
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Home, 
  Plus,
  Building2,
  Heart,
  Settings,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, activeRole, toggleRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Home className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl md:text-2xl font-bold text-foreground">
              Gojo<span className="text-primary">Rental</span>
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by location, property type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-secondary rounded-full border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {/* Role Toggle - Only show when authenticated */}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleRole}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <Building2 className="w-4 h-4" />
                <span>
                  {activeRole === 'renter' ? 'Switch to Owner' : 'Switch to Renter'}
                </span>
              </Button>
            )}

            {/* List Property Button */}
            <Link to={isAuthenticated ? '/properties/create' : '/auth'}>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                List Property
              </Button>
            </Link>

            {/* Auth Section */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 pl-2 pr-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="font-medium text-foreground">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email || user?.phone}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <Building2 className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/saved" className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      Saved Properties
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="default">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-down">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary outline-none text-foreground"
                />
              </div>
            </form>

            <div className="flex flex-col gap-2">
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  onClick={toggleRole}
                  className="justify-start gap-3"
                >
                  <Building2 className="w-5 h-5" />
                  {activeRole === 'renter' ? 'Switch to Owner' : 'Switch to Renter'}
                </Button>
              )}
              
              <Link 
                to={isAuthenticated ? '/properties/create' : '/auth'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <Plus className="w-5 h-5" />
                  List Property
                </Button>
              </Link>

              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <Building2 className="w-5 h-5" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/saved" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <Heart className="w-5 h-5" />
                      Saved Properties
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="w-full justify-start gap-3 text-destructive hover:text-destructive"
                  >
                    <LogOut className="w-5 h-5" />
                    Log out
                  </Button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
