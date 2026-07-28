export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);
export const isValidPassword = (password) => password.length >= 6;
export const isNotEmpty = (value) => value && value.trim().length > 0;