const request = require('supertest');
const express = require('express');
const usuarioRoutes = require('../routes/usuarioRoute');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use('/auth', usuarioRoutes);

describe('Cadastro de usuário', () => {
    beforeEach(async () => {
        await prisma.usuario.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('deve cadastrar um usuário com sucesso', async () => {
        const res = await request(app)
            .post('/auth/cadastro')
            .send({
                nome: 'Usuário Teste',
                email: 'teste@teste.com',
                password: '123456',
                tipo: 'comum'
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('msg', 'Usuário cadastrado com sucesso!');
    });

    it('deve fazer login com sucesso após cadastro', async () => {
        // Primeiro, cadastra o usuário
        await request(app)
            .post('/auth/cadastro')
            .send({
                nome: 'Usuário Teste',
                email: 'login@teste.com',
                password: 'senha123',
                tipo: 'comum'
            });
        // Agora, faz login
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'login@teste.com',
                password: 'senha123'
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('msg', 'Logado!');
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('usuarioId');
        expect(res.body).toHaveProperty('nome', 'Usuário Teste');
        expect(res.body).toHaveProperty('email', 'login@teste.com');
        expect(res.body).toHaveProperty('tipo', 'comum');
    });
});