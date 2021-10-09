let mongoose = require("mongoose");
let schema = mongoose.Schema;

let usuarioSchema = new schema({
  nombre: String,
  apellido: String,
  telefono: String,
  mail: String,
  contrasena: String,
  tiendas: Array,
  creacion: Date,
});

let Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
