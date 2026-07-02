const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Motorcycle = require('../models/Motorcycle');
const Location = require('../models/Location');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing data
    await Motorcycle.deleteMany();
    await Location.deleteMany();
    
    // Seed locations
    const locations = [
      {
        name: 'Satungal Station',
        nameNepali: 'सातुंगल स्टेशन',
        address: 'Satungal, Kathmandu 44600',
        addressNepali: 'सातुंगल, काठमाडौं ४४६००',
        coordinates: { lat: 27.7172, lng: 85.3240 },
        type: 'both',
        isActive: true,
        serviceable: true,
      },
      {
        name: 'ASHOK',
        nameNepali: 'अशोक',
        address: 'Kathmandu, Nepal',
        coordinates: { lat: 27.7100, lng: 85.3200 },
        type: 'both',
        isActive: true,
        serviceable: true,
      },
      {
        name: 'NADAR',
        nameNepali: 'नादर',
        address: 'Kathmandu, Nepal',
        coordinates: { lat: 27.7150, lng: 85.3300 },
        type: 'both',
        isActive: true,
        serviceable: true,
      },
    ];
    
    await Location.insertMany(locations);
    
    // Seed motorcycles
    const motorcycles = [
      {
        name: 'Honda Beat 2018',
        nameNepali: 'होन्डा बिट २०१८',
        brand: 'Honda',
        year: 2018,
        cc: 110,
        pricePerDay: 280,
        pricePerWeek: 1500,
        pricePerMonth: 5000,
        securityDeposit: 1000,
        images: ['honda_beat_1.jpg', 'honda_beat_2.jpg'],
        description: 'Well maintained Honda Beat, perfect for city rides',
        descriptionNepali: 'राम्रो मर्मत भएको होन्डा बिट, सहर यात्राको लागि उपयुक्त',
        specifications: {
          engine: '110cc',
          mileage: '60 km/l',
          fuelType: 'Petrol',
          transmission: 'Automatic',
        },
        location: {
          type: 'Point',
          coordinates: [85.3240, 27.7172],
          address: 'Satungal, Kathmandu',
        },
        available: true,
        featured: true,
        rating: 4.5,
        totalRentals: 120,
      },
      {
        name: 'Honda Scoopy',
        nameNepali: 'होन्डा स्कुपी',
        brand: 'Honda',
        year: 2020,
        cc: 110,
        pricePerDay: 280,
        pricePerWeek: 1600,
        pricePerMonth: 5500,
        securityDeposit: 1000,
        images: ['scoopy_1.jpg'],
        description: 'Stylish and easy to ride',
        location: {
          type: 'Point',
          coordinates: [85.3240, 27.7172],
          address: 'Satungal, Kathmandu',
        },
        available: true,
        featured: true,
        rating: 4.8,
        totalRentals: 85,
      },
      {
        name: 'Supra X 125',
        nameNepali: 'सुप्रा एक्स १२५',
        brand: 'Honda',
        year: 2019,
        cc: 125,
        pricePerDay: 280,
        pricePerWeek: 1700,
        pricePerMonth: 6000,
        securityDeposit: 1500,
        images: ['supra_1.jpg'],
        description: 'Powerful and comfortable',
        location: {
          type: 'Point',
          coordinates: [85.3240, 27.7172],
          address: 'Satungal, Kathmandu',
        },
        available: true,
        featured: true,
        rating: 4.6,
        totalRentals: 95,
      },
    ];
    
    await Motorcycle.insertMany(motorcycles);
    
    console.log('✅ Seed data inserted successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();