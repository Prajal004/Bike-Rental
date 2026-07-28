export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  OTP: '/otp',
  BIKE_DETAIL: '/bike/:id',
  BOOKING: '/booking',
  PAYMENT: '/payment',
  ORDERS: '/orders',
  PROFILE: '/profile',
  SOS: '/sos',
  REFERRAL: '/referral',
  NOTIFICATIONS: '/notifications',
};

export const PAYMENT_METHODS = [
  { id: 'esewa', label: 'eSewa', icon: '💰' },
  { id: 'khalti', label: 'Khalti', icon: '💳' },
  { id: 'fonepay', label: 'Fonepay', icon: '📱' },
  { id: 'cash', label: 'Cash on Pickup', icon: '💵' },
];

export const BIKE_BRANDS = [
  'Honda', 'Yamaha', 'TVS', 'Bajaj',
  'Royal Enfield', 'Suzuki', 'KTM', 'Hero', 'Other'
];