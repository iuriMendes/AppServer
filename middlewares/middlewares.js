let express = require("express");
let app = express();
let jwt = require("jsonwebtoken");
let config = require("../configs/config");
app.set("llave", config.llave);

module.exports = {
  validaToken: (req, res, next) => {
    const token = req.headers["token"];

    if (token) {
      jwt.verify(token, app.get("llave"), (err, decoded) => {
        if (err) {
          return res.json({ mensaje: "Token no es valido" });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(401);
      res.send({ mensaje: "Falta Token" });
    }
  },
  validaToken2: () => {},
};
