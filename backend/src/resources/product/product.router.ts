import { Router } from "express"
import productController from "./product.controller"
import isAdmin from "../../middlewares/isAdmin"
import schema from "./product.schema"
import validate from "../../middlewares/validate"

const router = Router()

router.get("/", productController.index)
router.post("/", isAdmin, validate(schema), productController.create)
router.get("/:id", productController.read)
router.put("/:id", isAdmin, validate(schema), productController.update)
router.delete("/:id", isAdmin, productController.remove)

export default router
