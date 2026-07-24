export const validators = {
  email: (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  },
  phone: (value) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(value);
  },
  password: (value) => {
    return value.length >= 6;
  },
  name: (value) => {
    return value.trim().length >= 2;
  },
};
