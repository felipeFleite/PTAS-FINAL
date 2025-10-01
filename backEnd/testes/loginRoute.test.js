const request = require('supertest')
const express = require('express')
const usuarioRoutes = require('../routes/usuarioRoute')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use('/auth', usuarioRoutes)

describe('Login de usuário', () => {
    beforeEach(async () => {
        await prisma.usuario.deleteMany()
        await request(app).post('/auth/cadastro').send({
            nome: 'Usuário Teste',
            email: 'login@teste.com',
            password: '123456',
        })
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })

    test('deve fazer login com sucesso', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'login@teste.com',
                password: '123456'
            })
        expect(res.statusCode).toBe(200)
        expect(res.body).toMatchObject({
            msg: 'Logado!',
            error: null
        })
        expect(res.body.token).toBeDefined();
    })

    test('deve dar erro ao logar com senha errada', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'login@teste.com',
                password: 'errada'
            })
        expect(res.statusCode).toBe(401)
        expect(res.body).toMatchObject({
            error: 'Email ou senha inválidos.',
            token: null
        })
    })
})
