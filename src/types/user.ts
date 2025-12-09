/**
 * User-related type definitions for Gojo Rental
 */

export type UserRole = 'renter' | 'owner' | 'both';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  verified: boolean;
  createdAt: string;
  savedProperties: string[]; // Property IDs
  viewedProperties: string[]; // Property IDs
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
