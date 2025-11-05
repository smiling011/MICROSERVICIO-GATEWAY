const express = require('express');
const axios = require('axios');
require('dotenv').config();

const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes'); 

const app = express();
const port = 3001;

app.use(express.json());
const PRODUCTS_SERVICE_URL = 'http://localhost:3002';

app.get('/productos-desde-usuarios', async (req, res) => {
    try {
        const response = await axios.get(`${PRODUCTS_SERVICE_URL}/productos`);
        res.json(response.data);
    } catch (error) {
        console.error('Error al conectar con el microservicio de productos:', error.message);       
        if (error.response) {           
            res.status(error.response.status).json(error.response.data);
        } else {           
            res.status(500).json({ message: 'Error al conectar con el servicio de productos.' });
        }
    }
});

app.use('/usuarios', userRoutes);
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos.');

    app.listen(port, () => {
      console.log(`Users Service escuchando en http://localhost:${port}`);
    });

  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

syncDatabase();
