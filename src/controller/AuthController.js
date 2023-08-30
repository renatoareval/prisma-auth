import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import pkg from "jsonwebtoken";

const prisma = new PrismaClient()

export default {

    async authenticate(req, res) {

        try {
            const { email, password } = req.body


            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (!user) {
                return res.json({ error: "Usuário não existe" })
            }



            const isValuePassword = await compare(password, user.password)

            if (!isValuePassword) {
                return res.json({ message: "Password invalida" })
            }

            const token = pkg.sign({ id: user.id }, "secret", { expiresIn: "1d" })

            const { id } = user

            return res.json({ user: { id, email }, token })
        } catch (error) {
            return res.json({ error })
        }

    },
}