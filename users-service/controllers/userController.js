
const User = require("../models/userModel");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll(); 
    res.json(users);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    res.status(500).send("Error obteniendo usuarios");
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId); 
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    res.json(user);
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    res.status(500).send("Error obteniendo usuario");
  }
};

exports.createUser = async (req, res) => {
  const { nombre, email, telefono } = req.body;
  if (!nombre || !email || !telefono) {
    return res.status(400).send("Nombre, email y telefono son obligatorios");
  }
  try {
    const newUser = await User.create({ nombre, email, telefono }); // Usa create() de Sequelize
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creando usuario:", error);   
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).send("El email ya está registrado");
    }
    res.status(500).send("Error creando usuario");
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { nombre, email, telefono } = req.body;
  if (!nombre || !email || !telefono) {
    return res.status(400).send("Nombre, email y telefono son obligatorios");
  }
  try {  
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }   
    await user.update({ nombre, email, telefono }); 
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).send("El email ya está registrado");
    }
    res.status(500).send("Error actualizando usuario");
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {  
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).send("Usuario no encontrado");
    }
    await user.destroy(); 
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    res.status(500).send("Error eliminando usuario");
  }
};