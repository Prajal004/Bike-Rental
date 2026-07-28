export const formatCurrency = (amount: number): string => {
  return `Rs ${amount.toLocaleString('en-IN')}`;
};

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const calculateDays = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const calculatePrice = (pricePerDay: number, days: number): number => {
  return pricePerDay * days;
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: '#F39C12',
    confirmed: '#3498DB',
    ongoing: '#2ECC71',
    completed: '#9B59B6',
    cancelled: '#E53935',
    paid: '#2ECC71',
    failed: '#E53935',
    success: '#2ECC71',
  };
  return colors[status] || '#888888';
};

export const getStatusLabel = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
};

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
