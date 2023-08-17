import express from "express";
import { autenticacionMiddleware } from "../middleware/verificar";
import { getGoogleReviews } from "../controllers/google";
import {
  novedades,
  explorar,
  filtroExplorar,
  producto,
  agregarAlCarrito,
  crearProducto,
  modificarProducto,
  eliminarProducto,
} from "../controllers/explorar";
import {
  crearUsuario,
  iniciarSesion,
  misProductosCarro,
} from "../controllers/usuario";

const router = express.Router();

// http://localhost:3001/api/[Nombre]

// Ruta para obtener las reseñas de Google
router.get("/GoogleReviews", getGoogleReviews);

// Rutas sobre los productos
router.get("/novedades", novedades);
router.get("/explorar", explorar);
router.get("/filtroExplorar/:categoria", filtroExplorar);
router.get("/producto/:nombre", producto);
router.get("/misProductos", autenticacionMiddleware, misProductosCarro);
router.put("/agregarAlCarrito", autenticacionMiddleware, agregarAlCarrito);

// Metodo CRUD Para Agregar/Quitar/Modificar un producto
router.post("/crearProducto", crearProducto);
router.put("/modificarProducto/:id", modificarProducto);
router.delete("/eliminarProducto/:id", eliminarProducto);

// Crear usuario / Iniciar Usuario / Recuperar contraseña
router.post("/usuario/crear", crearUsuario);
router.post("/usuario/iniciarSesion", iniciarSesion);
router.put("/usuario/actualizar/contraseña");

module.exports = router;
