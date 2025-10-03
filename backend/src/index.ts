import express from "express"
import dotenv from "dotenv"
import router from './router/v1Router';

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 7788

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send("Olá, bem-vindo(a) ao curso de PW2!")
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})
