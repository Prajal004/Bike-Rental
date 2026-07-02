const generateReferralCode = (name, phone) => {
  // Take first 4 letters of name + last 4 digits of phone
  const namePart = name.substring(0, 4).toUpperCase().replace(/[^A-Z]/g, '');
  const phonePart = phone.slice(-4);
  let code = `${namePart}${phonePart}`;
  
  // Ensure code is alphanumeric and not empty
  if (code.length < 4) {
    code = `USER${phonePart}`;
  }
  
  return code;
};

module.exports = { generateReferralCode };