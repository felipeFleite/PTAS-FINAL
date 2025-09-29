const request = require('supertest')
const express = require('express')
const usuarioRoutes = require('../routes/usuarioRoute')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use('/auth', usuarioRoutes)

describe('Cadastro de usuário', () => {
    beforeEach(async () => {
        await prisma.usuario.deleteMany()
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })

    it('deve cadastrar um usuário com sucesso', async () => {
        const res = await request(app).post('/auth/cadastro').send({
            nome: 'Usuário Teste',
            email: 'teste@teste.com',
            password: '123456',
            tipo: 'comum'
        })

        expect(res.statusCode).toBe(200)

        expect(res.body).toMatchObject({
            msg: 'Usuário cadastrado com sucesso!',
            error: null
        });
        expect(res.body.token).toBeDefined();
    })

    it('deve fazer login com sucesso após cadastro', async () => {
        await request(app).post('/auth/cadastro').send({
            nome: 'Usuário Teste',
            email: 'teste@teste.com',
            password: '123456',
            tipo: 'comum'
        });

        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'teste@teste.com',
                password: '123456'
            });

        expect(res.statusCode).toBe(200)
        expect(res.body).toMatchObject({
            msg: 'Logado!',
            error: null
        })
        
        expect(res.body.token).toBeDefined();
    });
});