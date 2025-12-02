import { Router } from "express"
import productController from "./product.controller"
import checkAutorization from "../../middlewares/checkAutorization"
import schema from "./product.schema"
import validate from "../../middlewares/validate"

const router = Router()

router.get("/", productController.index)
router.post("/", checkAutorization, validate(schema), productController.create)
router.get("/:id", productController.read)
router.put("/:id", checkAutorization, validate(schema), productController.update)
router.delete("/:id", checkAutorization, productController.remove)

export default router
