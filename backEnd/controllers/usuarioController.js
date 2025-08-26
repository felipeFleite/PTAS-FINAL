class UsuarioController {

     static async cadastrar(req, res) {
        const { nome, email, senha } = req.body;
     }

    const usuario = await client.usuario.create({
      data: {
        nome,
        email,
        senha,
      }
    });
    res.json({
      usuarioId: usuario.id
    });

}

module.exports = UsuarioController
