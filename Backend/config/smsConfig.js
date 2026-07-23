// Mock SMS configuration for development
const sendSMS = async (phoneNumber, message) => {
  console.log(`📱 [MOCK SMS] To: ${phoneNumber}`);
  console.log(`📝 [MOCK SMS] Message: ${message}`);
  
  // Simulate API call
  return { 
    success: true, 
    data: { 
      message: 'SMS sent successfully (MOCK)' 
    } 
  };
};

module.exports = { sendSMS };
