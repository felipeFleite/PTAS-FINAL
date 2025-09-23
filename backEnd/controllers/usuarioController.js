const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")

const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

class UsuarioController {
  static async cadastrar(req, res) {

    const { nome, email, senha } = req.body;

    const salt = bcryptjs.genSaltSync(8);
    const hashSenha = bcryptjs.hashSync(senha, salt);

    const usuario = await client.usuario.create({
      data: {
        nome,
        email,
        senha: hashSenha,
      }
    });
    res.json({
      usuarioId: usuario.id
    });
  }

    static async login(req, res) {
        const { email, senha } = req.body;  
      try {
            const usuario = await client.usuario.findUnique({
                where:{
                    email: email
                },
            })

            if (!usuario || usuario.senha !== senha) {
                return res.status(401).json({ error: "Email ou senha inválidos." });
            }

            res.json({ usuarioId: usuario.id, nome: usuario.nome, email: usuario.email });
        } catch (error) {
            res.status(500).json({ error: "Erro ao realizar login." });
        }
        
    // Verificar se a senha está correta
    const senhaCorreta = bcryptjs.compareSync(senha, usuario.senha);
    if (!senhaCorreta) {
      res.json({
        msg: "Senha Incorreta!"
      });
      return
    }

    // Emitir um token
    const token = jwt.sign({ id: usuario.id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      });
    res.json({
      msg: "Logado!",
      token: token,
    })
    }
}

module.exports = UsuarioController;