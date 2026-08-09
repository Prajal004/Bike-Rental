export const formatCurrency = (amount) => {
  return `Rs ${amount.toLocaleString('en-IN')}`;
};

export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const getStatusColor = (status) => {
  const colors = {
    pending: '#FF9800',
    confirmed: '#2196F3',
    ongoing: '#4CAF50',
    completed: '#4CAF50',
    cancelled: '#E53935',
    paid: '#4CAF50',
    failed: '#E53935',
  };
  return colors[status] || '#888';
};

export const truncateText = (text, maxLength = 30) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export default {
  formatCurrency,
  formatDate,
  getStatusColor,
  truncateText,
};
