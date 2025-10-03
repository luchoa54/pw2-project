import { Router } from "express"
import productController from "./product.controller"
import schema from "./product.schema"
import validate from "../../middlewares/validate"

const router = Router()

router.get("/", productController.index)
router.post("/", validate(schema), productController.create)
router.get("/:id", productController.read)
router.put("/:id", validate(schema), productController.update)
router.delete("/:id", productController.remove)

export default router
