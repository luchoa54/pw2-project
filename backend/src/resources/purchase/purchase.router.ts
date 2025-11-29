import { Router } from "express";
import purchaseController from "../purchase/purchase.controller";

const router = Router()

router.get("/cart", purchaseController.cart)

export default router