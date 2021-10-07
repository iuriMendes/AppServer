let mongoose = require("mongoose");
let schema = mongoose.Schema;

let productoSchema = new schema({
  nombre: String,
  descripcion: String,
  img: Array,
  precio: Number,
  tiempo_elaboracion: String,
  user: String,
});

let Producto = mongoose.model("Producto", productoSchema);

module.exports = Producto;
