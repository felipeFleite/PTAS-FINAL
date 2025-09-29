const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")

const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

class UsuarioController {
  
  static async cadastrar(req, res) {

    const { nome, email, password, tipo } = req.body;

    const salt = bcryptjs.genSaltSync(8);
    const hashSenha = bcryptjs.hashSync(password, salt);

    const usuario = await client.usuario.create({
      data: {
        nome,
        email,
        password: hashSenha,
        tipo,
      }
    });
    res.json({
      msg: "Usuário cadastrado com sucesso!",
    });
  }

static async login(req, res) {
    const { email, password } = req.body;
    try {
        const usuario = await client.usuario.findUnique({
            where: { email }
        });

        if (!usuario) {
            return res.status(401).json({ error: "Email ou senha inválidos." });
        }

        // Verificar se a senha está correta usando bcryptjs
        const senhaCorreta = bcryptjs.compareSync(password, usuario.password);
        if (!senhaCorreta) {
            return res.status(401).json({ error: "Email ou senha inválidos." });
        }

        // Emitir um token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({
            msg: "Logado!",
            token: token,
            usuarioId: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao realizar login." });
    }
}
}

module.exports = UsuarioController;