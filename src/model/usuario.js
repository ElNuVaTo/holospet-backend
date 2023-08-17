const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const emailRegex =
  /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;

const carrito = mongoose.Schema(
  {
    producto: { type: mongoose.Schema.Types.ObjectId, ref: "producto" },
  },
  {
    _id: false,
  }
);

const usuarioSchema = mongoose.Schema({
  correo: {
    type: String,
    unique: true,
    required: [true, "El correo es necesario"],
    validate: {
      validator: function (value) {
        return emailRegex.test(value);
      },
      message: "El correo electrónico no es válido",
    },
  },
  contra: {
    type: String,
    required: [true, "El password es obligatorio"],
  },
  agregarAlCarrito: [carrito],
});

usuarioSchema.plugin(uniqueValidator, {
  message: "Correo electrónico ya registrado",
});

const UserModel = mongoose.model("Usuario", usuarioSchema);

module.exports = UserModel;
