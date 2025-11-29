import express from "express"
import dotenv from "dotenv"
import router from "./router/v1Router"
import cookieParser from "cookie-parser"
import setLangCookie from "./middlewares/setLangCookie"
import session from "express-session"
import { v4 as uuidv4 } from "uuid"
import cors from 'cors';
import getEnv from "./utils/getEnv"

declare module "express-session" {
  interface SessionData {
    uid: string
    userType: string
    userId: string;
    userName: string
  }
}
dotenv.config()
const env = getEnv()
const app = express()
const PORT = process.env.PORT ?? 7788

app.use(express.json())
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true
}))
app.use(cookieParser())
app.use(setLangCookie)
app.use(
  session({
    genid: (req) => uuidv4(),
    secret: "Hi9Cf#mK98",
    resave: true,
    saveUninitialized: true,
  }),
)
app.use(router)

app.get("/", (req, res) => {
  res.send("Olá, bem-vindo(a) ao curso de PW2!")
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})
