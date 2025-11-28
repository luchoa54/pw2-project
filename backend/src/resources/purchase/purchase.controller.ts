import { Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import getCart from "./purchase.service"

const purchaseController = {
  cart: async (req: Request, res: Response) => {
    const userId = req.session.userId
    if (!userId)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(ReasonPhrases.UNAUTHORIZED)
    try {
      const userCart = await getCart(userId)
      res.status(StatusCodes.OK).json(ReasonPhrases.OK)
    } catch (err) {}
  },
}

export default purchaseController