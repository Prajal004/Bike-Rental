const axios = require('axios');

const sendSMS = async (phoneNumber, message) => {
  try {
    // Using Sparrow SMS API (Popular in Nepal)
    const response = await axios.post(process.env.SMS_API_URL, {
      token: process.env.SMS_API_KEY,
      from: process.env.SMS_SENDER_ID,
      to: phoneNumber,
      text: message,
    });
    
    console.log(`✅ SMS sent to ${phoneNumber}: ${message}`);
    return { success: true, response: response.data };
  } catch (error) {
    console.error(`❌ SMS failed: ${error.message}`);
    // Fallback: Log SMS for development
    console.log(`📱 [SMS FALLBACK] To: ${phoneNumber}, Message: ${message}`);
    return { success: false, error: error.message };
  }
};

module.exports = { sendSMS };