const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'my_secret_key_12345');
      
      // ✅ Database बाट User लिनुहोस् (role सहित)
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password', 'otpCode', 'otpExpiresAt'] }
      });

      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

      // ✅ req.user मा पूरा User Object Set गर्नुहोस् (role सहित)
      req.user = user;
      console.log('✅ Auth Middleware - User Role:', user.role); // Debug
      next();
    } catch (error) {
      console.error('Auth Error:', error);
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }
  }
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized, no token' 
    });
  }
};

module.exports = { protect };
