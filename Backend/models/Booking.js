const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  bookingId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  customerId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  motorcycleId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  shopId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  pickupLocation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dropoffLocation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  totalHours: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  totalDays: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  pricePerHour: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  pricePerDay: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  tax: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  securityDeposit: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'active', 'completed', 'cancelled', 'rejected'),
    defaultValue: 'pending'
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'refunded', 'failed'),
    defaultValue: 'pending'
  },
  paymentMethod: {
    type: DataTypes.ENUM('esewa', 'khalti', 'fonepay', 'cash'),
    allowNull: true
  },
  paymentId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  specialRequests: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cancellationReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'bookings',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Booking.beforeCreate(async (booking) => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const count = await Booking.count({
    where: {
      created_at: {
        [require('sequelize').Op.gte]: startOfDay
      }
    }
  });
  
  const sequence = (count + 1).toString().padStart(4, '0');
  booking.bookingId = `BK${year}${month}${day}${sequence}`;
});

// ✅ Association with Payment
Booking.associate = function(models) {
  Booking.belongsTo(models.User, {
    foreignKey: 'customerId',
    as: 'customer'
  });
  Booking.belongsTo(models.Motorcycle, {
    foreignKey: 'motorcycleId'
  });
  Booking.belongsTo(models.Shop, {
    foreignKey: 'shopId'
  });
  Booking.hasOne(models.Payment, {
    foreignKey: 'rentalId',
    as: 'payment'
  });
};

module.exports = Booking;
