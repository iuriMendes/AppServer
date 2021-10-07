let mongoose = require("mongoose");
let schema = mongoose.Schema;

let usuarioSchema = new schema({
  nombre: String,
  apellido: String,
  telefono: String,
  mail: String,
  ci: Number,
  contrasena: String,
  id_productos: Array,
  id_pedidos: Array,
  id_pickups: Array,
});

let Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
