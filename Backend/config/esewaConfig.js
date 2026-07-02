const crypto = require('crypto');

const ESEWA_CONFIG = {
  merchantCode: process.env.ESEWA_MERCHANT_CODE,
  secretKey: process.env.ESEWA_SECRET_KEY,
  isProduction: process.env.ESEWA_PRODUCTION === 'true',
  
  // API URLs
  getPaymentUrl: () => {
    return ESEWA_CONFIG.isProduction
      ? 'https://esewa.com.np/epay/main'
      : 'https://rc.esewa.com.np/epay/main';
  },
  
  getVerificationUrl: () => {
    return ESEWA_CONFIG.isProduction
      ? 'https://esewa.com.np/epay/transrec'
      : 'https://rc.esewa.com.np/epay/transrec';
  },
};

// Generate HMAC signature for eSewa
const generateEsewaSignature = (data) => {
  const hash = crypto.createHmac('sha256', ESEWA_CONFIG.secretKey);
  hash.update(JSON.stringify(data));
  return hash.digest('hex');
};

module.exports = { ESEWA_CONFIG, generateEsewaSignature };