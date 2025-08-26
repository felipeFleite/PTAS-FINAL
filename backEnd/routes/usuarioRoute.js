const router = require("express").Router();
const usuarioController = require("./controllers/usuarioController.js")

router.post("/cadastro", usuarioController.cadastrar);

module.exports = router