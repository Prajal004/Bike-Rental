const rateLimit = require('express-rate-limit');

// General rate limiter - 100 requests per minute
const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Auth rate limiter - 5 requests per 5 minutes (for login/signup)
const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 5 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// OTP rate limiter - 3 requests per 10 minutes
const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3,
  message: {
    success: false,
    message: 'Too many OTP requests. Please try again after 10 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Booking rate limiter - 10 requests per minute
const bookingLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: {
    success: false,
    message: 'Too many booking requests. Please slow down.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Payment rate limiter - 5 requests per minute
const paymentLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: {
    success: false,
    message: 'Too many payment requests. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  generalLimiter,
  authLimiter,
  otpLimiter,
  bookingLimiter,
  paymentLimiter
};