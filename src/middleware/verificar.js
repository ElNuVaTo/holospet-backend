import jwt from "jsonwebtoken";

const autenticacionMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Token no proporcionado" });
  }

  try {
    const decodedToken = jwt.verify(token, "secreto");
    req.userId = decodedToken.userId; // Agregar el ID del usuario a la solicitud
    next(); // Continuar con el manejo de la solicitud
  } catch (err) {
    res.status(401).json({ success: false, error: "Token inválido" });
  }
};

export { autenticacionMiddleware };
