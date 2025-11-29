import { Request, Response, NextFunction } from "express"
import { UserTypes } from "../resources/user/userType/userType.constants"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

const checkAutorization = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userType == UserTypes.admin) next();
  else res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN)
}

export default checkAutorization
