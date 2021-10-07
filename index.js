let express = require("express");
let app = express();
let cors = require("cors");
let jwt = require("jsonwebtoken");
let bodyParser = require("body-parser");
let config = require("./configs/config");
let mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ort:1234@cluster0.yzjai.mongodb.net/DApps?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
let PORT = process.env.PORT || 3000;
let Usuario = require("./models/Usuario");
let Producto = require("./models/Producto");
const middleware = require("./middlewares/middlewares");

let db = mongoose.connection;

db.once("open", () => {
  console.log("La conexión con la base de datos fue exitosa");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("llave", config.llave);

app.use((req, res, next) => {
  console.log("Pasa por el middleware");
  //res.send("Logueate");
  next();
});

app.get("/", (req, res) => {
  res.send("Bienvenido al servidor, usted está en localhost 3000");
});

//Parametros
app.get("/login", (req, res) => {
  if (req.body.contrasena.length > 5) {
    Usuario.findById(req.body.id, (err, usuario) => {
      if (err) {
        res.json({ mensaje: "error" });
      } else {
        const payload = {
          check: true,
        };
        const token = jwt.sign(payload, app.get("llave"), {
          expiresIn: 1440,
        });
        res.json({
          usuarioLogueado: usuario,
          mensaje: "logueado con exito",
          token: token,
        });
      }
    });
  } else {
    res.json({
      mensaje: "no comple con las validaciones necesarias",
    });
  }
});

app.get("/info", (req, res) => {
  res.send("Bienvenido al servidor, está en INFO");
});

//GET a la base de MongoDB
app.get("/listadousuarios", middleware.validaToken, (req, res) => {
  console.log("Llegamos a la peticion get de base");

  Usuario.find((err, response) => {
    if (err) {
      res.json({ mensaje: "Error en la consulta" });
    } else {
      res.json({ listadoUsuarios: response });
    }
  });
});

app.get("/usuarios/nombre", (req, res) => {
  console.log("Llegamos a la peticion get de base");

  Usuario.find({}, "nombre", (err, response) => {
    if (err) {
      res.json({ mensaje: "Error en la consulta" });
    } else {
      res.json({ listadoUsuarios: response });
    }
  });
});

app.get("/usuarios/filtro", (req, res) => {
  Usuario.find(
    { contrasena: { $gte: 1234 } },
    ["nombre", "apellido", "contrasena"],
    (err, response) => {
      if (err) {
        res.json({ mensaje: "Error en la consulta" });
      } else {
        res.json({ usuariosCoincidentes: response });
      }
    }
  );
});

//Parametros
app.get("/usuarios/:nombre", (req, res) => {
  Usuario.find(
    { nombre: { $eq: req.params.nombre } },
    ["nombre", "apellido", "contrasena"],
    (err, response) => {
      if (err) {
        res.json({ mensaje: "Error en la consulta" });
      } else {
        res.json({ usuario: response });
      }
    }
  );
});

//Parametro usuername
// app.get("/usuario/:ci", (req, res) => {
//   Usuario.findOne(
//     { ci: { $eq: req.params.ci } },
//     ["nombre", "apellido", "contrasena"],
//     (err, response) => {
//       if (err) {
//         res.json({ mensaje: "Error en la consulta" });
//       } else {
//         res.json({ usuario: response });
//       }
//     }
//   );
// });

//Parametro id
app.get("/usuario/:id", (req, res) => {
  Usuario.findById(req.params.id, (err, response) => {
    if (err) {
      res.json({ mensaje: "Error en la consulta" });
    } else {
      res.json({ usuario: response });
    }
  });
});

app.get("/listadoproductos", (req, res) => {
  console.log("Llegamos a la peticion get de base");

  Producto.find((err, response) => {
    if (err) {
      res.json({ mensaje: "Error en la consulta" });
    } else {
      res.json({ listadoProductos: response });
    }
  });
});
//borrar con id 615dff1bfd6539f39a71f4c8
// app.delete("/delete/:id", (req, res) => {
//   Usuario.findByIdAndDelete(req.params.id, (err, usuario) => {
//     if (err) {
//       res.json({ mensaje: "Error al borrar" });
//     } else {
//       res.json(response);
//     }
//   });
// });

//insertar user en la base Usuarios
app.post("/insertar", (req, res) => {
  let persona = new Usuario({
    nombre: "Nombre",
    apellido: "Insertado",
    telefono: "098876543",
    mail: "email@email.com",
    ci: 55555558,
    contrasena: "1234",
    id_productos: [],
    id_ppedidos: [],
    id_pickups: [],
  });
  persona.save((err, response) => {
    if (err) {
      res.json({ mensaje: "Error al insertar elemento" });
    } else {
      res.json(response);
    }
  });
});

app.listen(PORT, () => console.log("Servidor corriendo en puerto" + PORT));

/*
Listado de operadores relacionales
$eq - equal - igual
$lt - low than - menor que
$lte - low than equal - menor o igual que
$gt - greater than - mayor que
$gte - greater than equal - mayor o igual que
$ne - not equal - distinto
$in - in - dentro de
$nin - not in - no dentro de
*/
