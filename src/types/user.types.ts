export enum UserRole {
  USER = "user",
  STORE = "store",
  ADMIN = "admin",
}

export interface User {
  id?: string;
  email: string;
  password: string;
  username: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  storeInfo?: StoreInfo;
  profile?: UserProfile;
}

export interface StoreInfo {
  storeName: string;
  description?: string;
  logo?: string;
  verified: boolean;
  totalSales?: number;
  rating?: number;
}

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: Address;
  avatar?: string;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  username: string;
  role: UserRole;
  storeInfo?: StoreInfo;
  profile?: UserProfile;
}

export interface UpdateUserData {
  email?: string;
  username?: string;
  password?: string;
  role?: UserRole;
  isActive?: boolean;
  storeInfo?: StoreInfo;
  profile?: UserProfile;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
    role: UserRole;
  };
}

export interface JWTPayload {
  id: string;
  email: string;
  username: string;
  role: UserRole;
}
