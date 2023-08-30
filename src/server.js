import express from 'express'
import { router } from './routes.js'

const app = express()

app.use(express.json())
app.use(router)



app.listen(3030, console.log(`Server is running on port http://localhost:3030`))