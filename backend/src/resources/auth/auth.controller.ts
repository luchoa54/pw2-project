import { Request, Response } from "express"
import { LoginDto, SignUpDto } from "./auth.types"
import { checkAuth, 
  findUserByEmail,
  createUser, 
} from "./auth.service"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

const authController = {
  me: async (req: Request, res: Response) => {
    if (req.session.userId) {
      return res.status(StatusCodes.OK).json({
        userId: req.session.userId,
        userType: req.session.userType,
        userName: req.session.userName 
      });
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Sessão inválida" });
  },
  signup: async (req: Request, res: Response) => {
    const usuarioData = req.body as SignUpDto;
    try {
      if (await findUserByEmail(usuarioData.email)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Email informado já está sendo usado" });
      }
      const newUser = await createUser(usuarioData);
      const { password, ...userSemSenha } = newUser;
      res.status(StatusCodes.CREATED).json(userSemSenha);
    } catch (e: any) {
      console.error(e);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e.errors || { msg: "Erro interno no servidor" });
    }
  },
  login: async (req: Request, res: Response) => {
    const data = req.body as LoginDto
    try {
      const user = await checkAuth(data)
      if (!user) return res.status(StatusCodes.UNAUTHORIZED)
      req.session.userType = user.userTypeId
      req.session.userId = user.id
      req.session.userName = user.name
      res.status(StatusCodes.OK).json({
        userId: user.id,
        userType: user.userTypeId,
        userName: user.name
      })
    } catch (err) {
      console.log(err)
      res.json(err)
    }
  },
  logout: async (req: Request, res: Response) => {
    // Destrói a sessão
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ msg: "Não foi possível fazer logout." });
      }
      res.clearCookie('connect.sid'); 
      
      res.status(StatusCodes.OK).json({ msg: "Logout realizado com sucesso" });
    });
  },
}

export default authController
