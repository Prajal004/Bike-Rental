export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhone = (phone) => {
  return /^[0-9]{10}$/.test(phone);
};

export const isValidPassword = (password) => {
  return password.length >= 6;
};

export const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
};

export default {
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isNotEmpty,
};
