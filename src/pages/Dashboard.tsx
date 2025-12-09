/**
 * Owner Dashboard Page
 * Manage properties, view analytics, and handle inquiries
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Plus,
  Home,
  Eye,
  MessageCircle,
  TrendingUp,
  Building2,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  Users,
  DollarSign,
  ChevronRight,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { mockProperties } from '@/data/mockProperties';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending'>('all');

  // Mock user's properties (in real app, filter by owner ID)
  const userProperties = mockProperties.slice(0, 4);

  const stats = [
    {
      label: 'Total Properties',
      value: userProperties.length,
      icon: Building2,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Total Views',
      value: userProperties.reduce((sum, p) => sum + p.views, 0),
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Inquiries',
      value: 24,
      icon: MessageCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'This Month',
      value: '+12%',
      icon: TrendingUp,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
    }).format(price);
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
              You need to be logged in to access your dashboard
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
        <title>Dashboard - Gojo Rental</title>
        <meta name="description" content="Manage your property listings, view analytics, and handle inquiries." />
      </Helmet>

      <Layout>
        <div className="min-h-screen bg-secondary/30">
          {/* Header */}
          <div className="bg-card border-b border-border">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="heading-3 text-foreground mb-1">
                    Welcome back, {user?.name || 'Owner'}
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your properties and track performance
                  </p>
                </div>
                <Link to="/properties/create">
                  <Button variant="default" className="gap-2">
                    <Plus className="w-5 h-5" />
                    Add New Property
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-card rounded-2xl p-6 border border-border"
                  >
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", stat.bgColor)}>
                      <Icon className={cn("w-6 h-6", stat.color)} />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Properties List */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl border border-border">
                  {/* Tabs */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <h2 className="text-lg font-semibold text-foreground">
                      My Properties
                    </h2>
                    <div className="flex rounded-lg bg-secondary p-1">
                      {(['all', 'active', 'pending'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={cn(
                            "px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors",
                            activeTab === tab
                              ? "bg-background text-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Properties */}
                  <div className="divide-y divide-border">
                    {userProperties.map((property) => (
                      <div
                        key={property.id}
                        className="p-4 flex gap-4 hover:bg-secondary/30 transition-colors"
                      >
                        {/* Image */}
                        <Link to={`/properties/${property.id}`} className="flex-shrink-0">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-24 h-20 md:w-32 md:h-24 rounded-xl object-cover"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Link 
                                to={`/properties/${property.id}`}
                                className="font-semibold text-foreground hover:text-primary line-clamp-1"
                              >
                                {property.title}
                              </Link>
                              <p className="text-sm text-muted-foreground">
                                {property.location.subCity}, {property.location.city}
                              </p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="p-2 rounded-lg hover:bg-secondary">
                                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="gap-2">
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-2">
                            <span className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                              property.status === 'available' 
                                ? "bg-green-100 text-green-700"
                                : property.status === 'rented'
                                ? "bg-blue-100 text-blue-700"
                                : "bg-amber-100 text-amber-700"
                            )}>
                              {property.status}
                            </span>
                            <span className="text-sm font-semibold text-foreground">
                              {formatPrice(property.price)}/{property.priceUnit}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {property.views} views
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {Math.floor(Math.random() * 10) + 1} inquiries
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View All Link */}
                  <div className="p-4 border-t border-border">
                    <Link 
                      to="/dashboard/properties"
                      className="flex items-center justify-center gap-2 text-primary font-medium hover:underline"
                    >
                      View All Properties
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Recent Inquiries */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Recent Inquiries
                  </h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                          {['A', 'M', 'T'][i - 1]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            {['Abebe K.', 'Meron T.', 'Tadesse H.'][i - 1]}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            Interested in 3BR Apartment in Bole
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {i} hour{i > 1 ? 's' : ''} ago
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Messages
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Link to="/properties/create">
                      <Button variant="secondary" className="w-full justify-start gap-2">
                        <Plus className="w-4 h-4" />
                        Add New Property
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Users className="w-4 h-4" />
                      View Tenants
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <DollarSign className="w-4 h-4" />
                      Payment History
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Calendar className="w-4 h-4" />
                      Schedule Viewings
                    </Button>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    💡 Pro Tip
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Properties with high-quality photos get 2x more inquiries. 
                    Consider updating your listing photos for better visibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
