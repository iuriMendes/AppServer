let mongoose = require("mongoose");
let schema = mongoose.Schema;

let productoSchema = new schema({
  nombre: String,
  descripcion: String,
  img: Array,
  precio: Number,
  tiempoElaboracion: String,
  tienda: String,
});

let Producto = mongoose.model("Producto", productoSchema);

module.exports = Producto;
