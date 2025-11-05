// controllers/productController.js
const Product = require('../models/productModel');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
};

// Obtener producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de producto inválido' });
    }
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Error de validación', error: error.message });
    }
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });

    res.json(updatedProduct);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID inválido' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Error de validación', error: error.message });
    }
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(204).send();
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID inválido' });
    }
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
};
