const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate OTP with expiry (10 minutes)
const generateOTPWithExpiry = () => {
  const otp = generateOTP();
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);
  return { otp, expiresAt };
};

module.exports = { generateOTP, generateOTPWithExpiry };