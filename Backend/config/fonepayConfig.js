const FONEPAY_CONFIG = {
  merchantId: process.env.FONEPAY_MERCHANT_ID,
  secretKey: process.env.FONEPAY_SECRET_KEY,
  isProduction: process.env.FONEPAY_PRODUCTION === 'true',
  
  getQRUrl: () => {
    return FONEPAY_CONFIG.isProduction
      ? 'https://api.fonepay.com/api/qr/v2'
      : 'https://test.fonepay.com/api/qr/v2';
  },
};

module.exports = { FONEPAY_CONFIG };