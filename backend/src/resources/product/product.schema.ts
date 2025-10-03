import Joi from "joi"

export const productSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).integer().required(),
})

const celularMoto = {
  name: "Smartphone Motorola Edge 30",
  price: 1499.0,
  stock: 3,
}

const schema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().required(),
  stock: Joi.number().integer().required(),
})

const result = productSchema.validate(celularMoto)

export default schema;
