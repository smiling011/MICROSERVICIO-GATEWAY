
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 3002;


app.use(express.json());
connectDB();

app.use('/productos', productRoutes);

app.listen(port, () => {
  console.log(`Products Service escuchando en http://localhost:${port}`);
});
