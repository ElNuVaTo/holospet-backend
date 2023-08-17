import jwt from "jsonwebtoken";

import UsuarioModel from "../model/usuario";

const crearUsuario = async (req, res) => {
  try {
    const { correo, contra } = req.body;

    const nuevoUsuario = new UsuarioModel({
      correo,
      contra,
    });

    const guardarDB = await nuevoUsuario.save();

    res.status(201).json({ success: true, usuario: guardarDB });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const iniciarSesion = async (req, res) => {
  try {
    const { correo, contra } = req.body;

    const usuario = await UsuarioModel.findOne({ correo });

    if (correo !== usuario.correo || contra !== usuario.contra) {
      return res
        .status(401)
        .json({ success: false, error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ userId: usuario._id }, "secreto", {
      expiresIn: "1h",
    });

    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const misProductosCarro = async (req, res) => {
  try {
    const { userId } = req;

    // Obtén el usuario con su carrito de productos
    const usuario = await UsuarioModel.findById(userId)
      .populate("agregarAlCarrito.producto")
      .exec();

    if (!usuario) {
      return res.status(404).json({ success: false, error: "Usuario no encontrado" });
    }

    // Accede a los productos en el carrito del usuario
    const productosEnCarrito = usuario.agregarAlCarrito.map((item) => item.producto);

    res.status(200).json({ success: true, productos: productosEnCarrito });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export { crearUsuario, iniciarSesion , misProductosCarro};
