import { cleanEnv, num, port, str, url } from "envalid";
import dotenv from "dotenv"

dotenv.config({quiet: true})

function getEnv() {
    return cleanEnv(process.env, {
        FRONTEND_URL: url(),
        PORT: port({default: 7788}),
        DEFAULT_LANGUAGE: str({default: 'pt-BR'}),
        SESSION_SECRET: str(),
        BCRYPT_ROUNDS: num( {default: 10})
    })
}

export default getEnv