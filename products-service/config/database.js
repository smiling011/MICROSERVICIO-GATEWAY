
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.DATABASE_URL;
    await mongoose.connect(mongoUri);
    console.log('Conectado a MongoDB correctamente');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
