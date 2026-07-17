// Change this if your backend runs somewhere else.
const API_BASE = 'http://localhost:4000/api';

const Auth = {
  getToken: () => localStorage.getItem('prajal_token'),
  setToken: (t) => localStorage.setItem('prajal_token', t),
  getUser: () => JSON.parse(localStorage.getItem('prajal_user') || 'null'),
  setUser: (u) => localStorage.setItem('prajal_user', JSON.stringify(u)),
  logout: () => {
    localStorage.removeItem('prajal_token');
    localStorage.removeItem('prajal_user');
    window.location.href = 'login.html';
  },
  requireAuth: () => {
    if (!Auth.getToken()) window.location.href = 'login.html';
  }
};

async function api(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = Auth.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || 'Something went wrong.');
    err.data = data;
    throw err;
  }
  return data;
}

function showError(elId, message) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
}

function clearError(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = '';
  el.classList.remove('show');
}

function formatMoney(n) {
  return 'Rs ' + Number(n).toLocaleString();
}
