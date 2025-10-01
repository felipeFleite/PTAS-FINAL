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

    test('deve cadastrar um usuário com sucesso', async () => {
        const res = await request(app).post('/auth/cadastro').send({
            nome: 'Usuário Teste',
            email: 'teste@teste.com',
            password: '123456',
        })
        expect(res.statusCode).toBe(200)
        expect(res.body).toMatchObject({
            msg: 'Usuário cadastrado com sucesso!',
            error: null
        });
        expect(res.body.token).toBeDefined()
    })

        test('deve cadastrar um usuário admin com sucesso', async () => {
        const res = await request(app).post('/auth/cadastro').send({
            nome: 'Usuário Teste',
            email: 'teste@teste.com',
            password: '123456',
            tipo: 'admin'
        })
        expect(res.statusCode).toBe(200)
        expect(res.body).toMatchObject({
            msg: 'Usuário cadastrado com sucesso!',
            error: null
        });
        expect(res.body.token).toBeDefined()
    })

    test('deve dar erro ao cadastrar usuário com email já existente', async () => {
        await request(app).post('/auth/cadastro').send({
            nome: 'Usuário Teste',
            email: 'teste@teste.com',
            password: '123456',
        })
        const res = await request(app).post('/auth/cadastro').send({
            nome: 'Roberto',
            email: 'teste@teste.com',
            password: 'outraSenha',
        })
        expect(res.statusCode).toBeGreaterThanOrEqual(400)
        expect(res.body).toMatchObject({
            msg: null,
            error: 'E-mail já cadastrado.',
            token: null
        })
    })
})
