const formatCurrency = (amount, lang = 'en') => {
  if (lang === 'ne') {
    return `रु ${amount.toLocaleString('ne-NP')}`;
  }
  return `Rs ${amount.toLocaleString('en-IN')}`;
};

// Format date
const formatDate = (date, lang = 'en') => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  if (lang === 'ne') {
    return new Date(date).toLocaleDateString('ne-NP', options);
  }
  return new Date(date).toLocaleDateString('en-US', options);
};

// Calculate rental days between two dates
const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Calculate rental price
const calculatePrice = (motorcycle, days, deliveryFee = 0) => {
  let basePrice;
  
  if (days >= 30 && motorcycle.pricePerMonth) {
    basePrice = motorcycle.pricePerMonth;
  } else if (days >= 7 && motorcycle.pricePerWeek) {
    basePrice = motorcycle.pricePerWeek;
  } else {
    basePrice = motorcycle.pricePerDay * days;
  }
  
  const total = basePrice + deliveryFee + motorcycle.securityDeposit;
  
  return {
    basePrice,
    deliveryFee,
    securityDeposit: motorcycle.securityDeposit,
    total,
    days,
  };
};

// Generate unique ID
const generateUniqueId = (prefix = '') => {
  const date = new Date();
  const timestamp = date.getTime().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

module.exports = {
  formatCurrency,
  formatDate,
  calculateDays,
  calculatePrice,
  generateUniqueId,
};