const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { PrismaClient } = require("@prisma/client")
const client = new PrismaClient()

class UsuarioController {

  static async cadastrar(req, res) {
    const { nome, email, password, tipo } = req.body
    try {
      const salt = bcryptjs.genSaltSync(8);
      const hashSenha = bcryptjs.hashSync(password, salt)
      const usuario = await client.usuario.create({
        data: {
          nome,
          email,
          password: hashSenha,
          tipo,
        }
      })

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.json({
        msg: "Usuário cadastrado com sucesso!",
        error: null,
        token
      });
    } catch (error) {
      let msg = "Erro ao cadastrar usuário."
      if (error.code === 'P2002') {
        msg = "E-mail já cadastrado."
      }
      res.status(400).json({
        msg: null,
        error: msg,
        token: null
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body
    try {
      const usuario = await client.usuario.findUnique({
        where: { email }
      });

      if (!usuario) {
        return res.status(401).json({ error: "Email ou senha inválidos." })
      }

      const senhaCorreta = bcryptjs.compareSync(password, usuario.password)
      if (!senhaCorreta) {
        return res.status(401).json({ error: "Email ou senha inválidos." })
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({
        msg: "Logado!",
        token: token,
        error: null
      })
    } catch (error) {
      res.json({
        msg: null,
        error: "Erro ao realizar login.",
        token: null
      });
    }
  }
}

module.exports = UsuarioController;