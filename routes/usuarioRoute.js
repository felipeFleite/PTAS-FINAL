const router = require("express").Router();
const usuarioController = require("../controllers/usuarioController")

router.post("/cadastro", usuarioController.cadastrar);
router.post("/cadastro", usuarioController.login);

module.exports = router