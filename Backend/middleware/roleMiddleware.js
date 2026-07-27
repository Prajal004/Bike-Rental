const RoleMiddleware = {
  // Check if user has required role
  checkRole: (allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Insufficient permissions.'
        });
      }

      next();
    };
  },

  // Check if user is shop owner
  isShopOwner: (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (req.user.role !== 'shop_owner') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Shop owner only.'
      });
    }

    next();
  },

  // Check if user is customer
  isCustomer: (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (req.user.role !== 'customer') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Customer only.'
      });
    }

    next();
  },

  // Check if user is rider
  isRider: (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (req.user.role !== 'rider') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Rider only.'
      });
    }

    next();
  },

  // Check if user is admin
  isAdmin: (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.'
      });
    }

    next();
  },

  // Check if user owns the resource
  checkOwnership: (model) => {
    return async (req, res, next) => {
      try {
        const resource = await model.findById(req.params.id);
        if (!resource) {
          return res.status(404).json({
            success: false,
            message: 'Resource not found'
          });
        }

        // Check if user owns this resource
        if (resource.userId?.toString() !== req.user.id && 
            resource.customerId?.toString() !== req.user.id && 
            resource.shopId?.toString() !== req.user.shopId) {
          return res.status(403).json({
            success: false,
            message: 'Access denied. You do not own this resource.'
          });
        }

        req.resource = resource;
        next();
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: 'Error checking ownership',
          error: error.message
        });
      }
    };
  }
};

module.exports = RoleMiddleware;