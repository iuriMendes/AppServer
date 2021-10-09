let mongoose = require("mongoose");
let schema = mongoose.Schema;

let tiendaSchema = new schema({
  usuario: String,
  nombre: String,
  descripcion: String,
  dias: String,
  horas: String,
  direccion: Object,
  productos: Array,
  pedidos: Array,
  pickups: Array,
});

let Tienda = mongoose.model("Tienda", usuarioSchema);

module.exports = Tienda;
