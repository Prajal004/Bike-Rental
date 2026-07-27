const ValidationUtils = {
  // Email validation
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Phone number validation (Nepal format)
  isValidPhone: (phone) => {
    const phoneRegex = /^(98|97|96)\d{8}$/;
    return phoneRegex.test(phone);
  },

  // Password validation (min 8 chars, at least 1 uppercase, 1 lowercase, 1 number)
  isValidPassword: (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  },

  // PAN number validation (Nepal)
  isValidPAN: (pan) => {
    const panRegex = /^\d{9}$/;
    return panRegex.test(pan);
  },

  // Citizenship number validation (Nepal)
  isValidCitizenship: (citizenship) => {
    // Format: 01-01-12345678
    const citizenshipRegex = /^\d{2}-\d{2}-\d{8}$/;
    return citizenshipRegex.test(citizenship);
  },

  // License number validation (Nepal)
  isValidLicense: (license) => {
    // Format: 01-01-12345678
    const licenseRegex = /^\d{2}-\d{2}-\d{8}$/;
    return licenseRegex.test(license);
  },

  // Vehicle registration number (Nepal)
  isValidVehicleReg: (reg) => {
    // Format: BA 01 A 1234
    const regRegex = /^[A-Z]{2}\s\d{2}\s[A-Z]{1}\s\d{4}$/;
    return regRegex.test(reg);
  },

  // URL validation
  isValidURL: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Check if string is empty or whitespace
  isNullOrEmpty: (str) => {
    return !str || str.trim().length === 0;
  },

  // Check if value is within range
  isWithinRange: (value, min, max) => {
    return value >= min && value <= max;
  },

  // Validate coordinates
  isValidCoordinates: (lat, lng) => {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  },

  // Validate date (not past)
  isFutureDate: (date) => {
    return new Date(date) > new Date();
  },

  // Validate date (not before today)
  isValidDateRange: (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= end && start >= new Date();
  },

  // Sanitize input (prevent XSS)
  sanitizeInput: (input) => {
    if (typeof input === 'string') {
      return input.replace(/[<>]/g, '');
    }
    return input;
  }
};

module.exports = ValidationUtils;