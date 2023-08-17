import ProductoModel from "../model/producto";
import UsuarioModel from "../model/usuario";

const novedades = async (req, res) => {
  try {
    const productosAgregadosRecientemente = await ProductoModel.find().sort({ createdAt: -1 }).limit(8);

    res 
      .status(200)
      .json({ success: true, productos: productosAgregadosRecientemente });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const explorar = async (req, res) => {
  try {
    const allExplorar = await ProductoModel.find();

    res.status(200).json({ success: true, productos: allExplorar });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const filtroExplorar = async (req, res) => {
  try {
    const categoria = req.params.categoria;
    const productosPorCategoria = await ProductoModel.find({ categoria });

    // Verificar si existen productos para la categoría
    if (productosPorCategoria.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No se encontraron productos para la categoría proporcionada",
      });
    }

    // Enviar una respuesta con los productos obtenidos
    res.status(200).json({ success: true, productos: productosPorCategoria });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const producto = async (req, res) => {
  try {
    const nombreRutaAmigable = req.params.nombre;
    const nombreProducto = nombreRutaAmigable.replace(/_/g, " ");

    // Obtener el producto por su nombre amigable
    const productoEncontrado = await ProductoModel.findOne({
      idName: nombreProducto,
    });

    // Verificar si el producto existe
    if (!productoEncontrado) {
      return res
        .status(404)
        .json({ success: false, error: "Producto no encontrado" });
    }

    // Enviar una respuesta con el producto obtenido
    res.status(200).json({ success: true, producto: productoEncontrado });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const agregarAlCarrito = async (req, res) => {
  try {
    const { carrito } = req.body;
    const { userId } = req;

    const productoDB = await ProductoModel.findOne({
      _id: carrito,
    });

    const usuarioActualizado = await UsuarioModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { agregarAlCarrito: { producto: productoDB } } },
      { new: true }
    );

    res.status(200).json({ success: true, usuario: usuarioActualizado });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// CRUD
const crearProducto = async (req, res) => {
  try {
    const { imgSrc, nombre, marca, precio, categoria } = req.body;

    const nuevoProducto = new ProductoModel({
      imgSrc,
      nombre,
      marca,
      precio,
      categoria,
    });

    const guardarDB = await nuevoProducto.save();

    // Envía una respuesta de éxito junto con el producto creado
    res.status(201).json({ success: true, producto: guardarDB });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const modificarProducto = async (req, res) => {
  try {
  } catch (err) {}
};
const eliminarProducto = async (req, res) => {
  try {
  } catch (err) {}
};

export {
  novedades,
  explorar,
  filtroExplorar,
  producto,
  agregarAlCarrito,
  crearProducto,
  modificarProducto,
  eliminarProducto,
};
