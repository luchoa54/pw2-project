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
      res.status(StatusCodes.OK).json(userCart) 
      
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
  },
}

export default purchaseController