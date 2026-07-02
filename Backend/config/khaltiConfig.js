const KHALTI_CONFIG = {
  secretKey: process.env.KHALTI_SECRET_KEY,
  isProduction: process.env.KHALTI_PRODUCTION === 'true',
  
  getPaymentUrl: () => {
    return KHALTI_CONFIG.isProduction
      ? 'https://khalti.com/api/v2/payment/initiate/'
      : 'https://dev.khalti.com/api/v2/payment/initiate/';
  },
  
  getVerificationUrl: () => {
    return KHALTI_CONFIG.isProduction
      ? 'https://khalti.com/api/v2/payment/verify/'
      : 'https://dev.khalti.com/api/v2/payment/verify/';
  },
};

module.exports = { KHALTI_CONFIG };