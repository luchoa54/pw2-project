import { Router } from "express";
import purchaseItemController from "./purchaseItem.controller";

const router = Router()

router.post("/inc", purchaseItemController.inc)
router.post("/dec", purchaseItemController.dec)

export default router