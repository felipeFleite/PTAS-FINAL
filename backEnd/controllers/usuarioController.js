const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

class UsuarioController {
    static async cadastrar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const usuario = await client.usuario.create({
                data: { nome, email, senha }
            });
            res.json({ usuarioId: usuario.id });
        } catch (error) {
            res.status(500).json({ error: "Erro ao cadastrar usuário." });
        }
    }

    static async login(req, res) {
        const { email, senha } = req.body;  
      try {
            const usuario = await client.usuario.findUnique({
                where:{email,
                  
                },
            });

            if (!usuario || usuario.senha !== senha) {
                return res.status(401).json({ error: "Email ou senha inválidos." });
            }

            res.json({ usuarioId: usuario.id, nome: usuario.nome, email: usuario.email });
        } catch (error) {
            res.status(500).json({ error: "Erro ao realizar login." });
        }
    }
}

module.exports = UsuarioController;