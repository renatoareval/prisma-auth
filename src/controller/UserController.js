import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient()

export default {

    async createUser(req, res) {

        try {
            const { name, email, password } = req.body
            const hash_password = await hash(password, 8)

            let user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (user) {
                return res.json({ error: "Usuário já existe" })
            }

            user = await prisma.user.create({

                data: {
                    name,
                    email,
                    password: hash_password

                }
            })

            const { id } = user

            return res.json({ user })
        } catch (error) {
            return res.json({ error })
        }

    },

    async findAllUsers(req, res) {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    created_at: true
                }
            })
            
            return res.json(users)
        } catch (error) {
            return res.json({ error })

        }
    },

    async findUser(req, res) {
        try {
            const { id } = req.params
            const user = await prisma.user.findUnique({

                where: {
                    id: Number(id)
                }

            })

            if (!user) {
                return res.json({ error: 'Não foi possível encontrar o usuário' })
            }
            return res.json(user)
        } catch (error) {
            return res.json({ error })

        }
    },

    async updateUser(req, res) {
        try {
            const { id } = req.params

            const { name, email } = req.body

            let user = await prisma.user.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (!user) {
                return res.json({ error: 'Não foi possível encontrar o usuário' })
            }

            user = await prisma.user.update({
                where: { id: Number(id) },
                data: { name, email }
            })

            return res.json(user)
        } catch (error) {

        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params

            const user = prisma.user.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (!user) res.json({ error: "Não foi possível encontrar o usuário" })

            await prisma.user.delete({
                where: {
                    id: Number(id)
                }
            })

            return res.json({ message: "Usuário deletado com sucesso" })
        } catch (error) {
            return res.json({ error })
        }
    }
}