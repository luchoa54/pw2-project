// Deixe seu validate.ts assim
import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    })
    if (error) {
      // Usar 400 é bom para o .catch() que fizemos no frontend
      res.status(400).json({ 
          message: "Os dados fornecidos são inválidos.",
          details: error.details 
      })
    }
    else next()
  }
}
export default validate