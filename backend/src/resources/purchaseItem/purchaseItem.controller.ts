import { Request, Response } from "express";
import { incPurchaseItem, decPurchaseItem } from "./purchaseItem.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { IncDto } from "./purchaseItem.types";

const inc = async (req: Request, res: Response) => {
    const { productId } = req.body as IncDto
    const userId = req.session.userId
    if (!userId) return res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED)
    try {
        await incPurchaseItem(userId, productId)
        res.status(StatusCodes.OK).json(ReasonPhrases.OK)
    } catch (err) {
        console.log("ERRO NO INC:", err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
}

const dec = async (req: Request, res: Response) => {
    const { productId } = req.body as IncDto
    const userId = req.session.userId
    if (!userId) return res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED)
    try {
        await decPurchaseItem(userId, productId)
        res.status(StatusCodes.OK).json(ReasonPhrases.OK)
    } catch (err) {
        console.log("ERRO NO INC:", err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
}

export default { inc, dec }