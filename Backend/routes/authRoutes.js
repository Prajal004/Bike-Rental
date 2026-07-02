const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Secret key - एउटा मात्र
const JWT_SECRET = 'my_secret_key_12345';

// Temporary storage
const users = [];

// Generate token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Register
router.post('/register', (req, res) => {
  const { fullName, email, phone, password } = req.body;
  
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ 
      success: false, 
      message: 'User already exists' 
    });
  }
  
  const newUser = {
    id: users.length + 1,
    fullName,
    email,
    phone,
    password,
    createdAt: new Date()
  };
  
  users.push(newUser);
  const token = generateToken(newUser);
  
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: { id: newUser.id, fullName, email, phone }
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
  
  const token = generateToken(user);
  
  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: { id: user.id, fullName: user.fullName, email: user.email }
  });
});

// Get all users
router.get('/users', (req, res) => {
  res.json({ success: true, users });
});

module.exports = router;
