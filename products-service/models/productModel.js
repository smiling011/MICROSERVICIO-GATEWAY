const mongoose = require('mongoose');
// Define el esquema para los productos
const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true, 
        trim: true    
    },
    precio: {
        type: Number,
        required: true,
        min: 0         
    }
}, {
    timestamps: true 
});

// Crea el modelo `Product` a partir del esquema
const Product = mongoose.model('Producto', productSchema);//Product-> productos

module.exports = Product;