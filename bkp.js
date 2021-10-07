let express = require("express");
let app = express();
let cors = require("cors");
let mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://ortuser:ort@cluster0.dyybl.mongodb.net/informacion?retryWrites=true&w=majority",
//   { useNewUrlParser: true }
// );
mongoose.connect(
  "mongodb+srv://ort:1234@cluster0.yzjai.mongodb.net/DApps?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

let Usuario = require("./models/Usuario");

let db = mongoose.connection;

db.once("open", () => {
  console.log("La conexión con la base de datos fue exitosa");
});

app.use(cors());

app.use((req, res, next) => {
  console.log("Pasa por el middleware");
  //res.send("Logueate");
  next();
});

app.get("/", (req, res) => {
  res.send("Bienvenido al servidor, usted está en localhost 3000");
});

app.get("/info", (req, res) => {
  res.send("Bienvenido al servidor, está en INFO");
});

//peticion con parametro en request forma 1
app.get("/usuario/:id/:nombre", (req, res) => {
  if (req.params.nombre.length > 4) {
    res.send("Id enviado en URL: " + req.params.id + " de nombre largo");
  } else {
    res.send("Id enviado en URL: " + req.params.id + " de nombre corto");
  }
});

//peticion con parametro en request forma 2
//localhost:300/pelicula?nombrepelicula=cars&generopelicula=animada
app.get("/pelicula", (req, res) => {
  res.send(
    `Película: ${req.query.nombrepelicula} / Género ${req.query.generopelicula}`
  );
});

app.get("/test", (req, res) => {
  res.send(`Película: ${query.Users}`);
});

//informacion propia del request
app.get("/informacion", (req, res) => {
  res.send(`IP: ${req.ip} <br/>
    Ruta ${req.url} <br/>
    Protocolo ${req.protocol} <br/>
    Seguro ${req.secure}
    `);
});

//objeto response
app.get("/usuarios", (req, res) => {
  res.status(200);
  res.json({
    nombre: "Marisol",
    apellido: "Martinezzzz",
  });
});

//GET a la base de MongoDB
app.get("/listadousuarios", (req, res) => {
  console.log("Llegamos a la peticion get de base");

  Usuario.find((err, response) => {
    if (err) {
      res.json({ mensaje: "Error en la consulta" });
    } else {
      res.json({ listadoUsuarios: response });
    }
  });
});

app.post("/", (req, res) => {
  res.send("Petición recibida por POST");
});

app.put("/", (req, res) => {
  res.send("Petición por PUT");
});

app.delete("/", (req, res) => {
  res.send("Petición por DELETE");
});

app.use((req, res, next) => {
  res.send("No se encuentra el recurso al que quiere acceder");
});

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
