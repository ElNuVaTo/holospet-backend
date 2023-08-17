const mongoose = require("mongoose");

const productoExplorarSchema = mongoose.Schema(
  {
    idName: { type: String },
    imgSrc: { type: String, required: true },
    nombre: { type: String, required: true },
    marca: { type: String, required: true },
    precio: { type: String, required: true },
    categoria: {
      type: String,
      enum: ["accesorio", "seca", "humeda", "arena", "farmacia", "cuidados"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generar idName basado en el nombre
productoExplorarSchema.pre("save", function (next) {
  this.idName = this.nombre.toLowerCase().replace(/ /g, "-").replace(/ñ/g, "n");
  next();
});

const ProductoExplorarModel = mongoose.model(
  "producto",
  productoExplorarSchema
);

module.exports = ProductoExplorarModel;
