// Mock SMS for development
const sendSMS = async (phoneNumber, message) => {
  console.log(`📱 [DEV SMS] To: ${phoneNumber}`);
  console.log(`📝 [DEV SMS] Message: ${message}`);
  console.log('✅ [DEV SMS] Mock sent successfully!');
  
  // Return success for development
  return { 
    success: true, 
    message: 'Mock SMS sent',
    devMode: true 
  };
};

// Send OTP via SMS
const sendOTP = async (phoneNumber, otp) => {
  const message = `Your verification code for Motorcycle Rental App is: ${otp}. Valid for 10 minutes. - YourAppName`;
  console.log(`📱 Sending OTP ${otp} to ${phoneNumber}`);
  return await sendSMS(phoneNumber, message);
};

// Send SOS alert SMS
const sendSOSAlert = async (contactName, contactPhone, userName, location, mapsLink) => {
  const message = `🚨 EMERGENCY SOS ALERT! ${userName} needs immediate help. Last known location: ${location}. Track live: ${mapsLink}. Please take action immediately. - YourAppName`;
  return await sendSMS(contactPhone, message);
};

// Send referral bonus SMS
const sendReferralBonusSMS = async (phoneNumber, amount, type) => {
  const message = type === 'earned' 
    ? `🎉 Congrats! You earned Rs ${amount} referral credit! Share your code to earn more. - YourAppName`
    : `🎉 You got Rs ${amount} discount from a friend's referral! Enjoy your ride. - YourAppName`;
  return await sendSMS(phoneNumber, message);
};

// Send rental confirmation SMS
const sendRentalConfirmation = async (phoneNumber, rentalId, bikeName, startDate, endDate, totalPrice) => {
  const message = `✅ Rental Confirmed! ID: ${rentalId}, Bike: ${bikeName}, From: ${startDate}, To: ${endDate}, Total: Rs ${totalPrice}. Track in app. - YourAppName`;
  return await sendSMS(phoneNumber, message);
};

module.exports = {
  sendSMS,
  sendOTP,
  sendSOSAlert,
  sendReferralBonusSMS,
  sendRentalConfirmation,
};
