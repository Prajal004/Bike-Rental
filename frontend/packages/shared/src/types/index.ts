export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'customer' | 'shop_owner' | 'admin';
  walletBalance: number;
  isVerified: boolean;
  referralCode?: string;
}

export interface Motorcycle {
  id: string;
  name: string;
  brand: string;
  year: number;
  cc: number;
  pricePerDay: number;
  images: string[];
  description: string;
  available: boolean;
  shopId: string;
  shopName?: string;
  rating: number;
  totalReviews: number;
}

export interface Shop {
  id: string;
  shopName: string;
  address: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  isVerified: boolean;
  rating: number;
  totalRentals: number;
  openTime: string;
  closeTime: string;
}

export interface Rental {
  id: string;
  userId: string;
  motorcycleId: string;
  motorcycleName?: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  pickupLocation: string;
  returnLocation: string;
}

export interface Payment {
  id: string;
  rentalId: string;
  amount: number;
  method: 'esewa' | 'khalti' | 'fonepay' | 'cash';
  status: 'pending' | 'success' | 'failed';
  transactionId?: string;
}

export interface SOSAlert {
  id: string;
  userId: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  status: 'active' | 'resolved' | 'false_alarm';
  timestamp: string;
}

export interface Referral {
  code: string;
  totalReferrals: number;
  creditsEarned: number;
  walletBalance: number;
}

export interface Review {
  id: string;
  userId: string;
  motorcycleId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Document {
  id: string;
  userId: string;
  type: 'license' | 'citizenship' | 'registration' | 'insurance';
  documentUrl: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'sos' | 'system';
  read: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
