import { Request, Response } from "express"
import { createProduct, alreadyExists } from "./product.service"
import { Prisma } from "@prisma/client";

const productController = {
  // Coloque sua função create aqui dentro
  create: async (req: Request, res: Response) => {
    const product = req.body;
    try {
      if (await alreadyExists(product.name)) {
        return res.status(400).json({ msg: 'Produto já existe' });
      }
      const newProduct = await createProduct(product);
      res.status(201).json(newProduct);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientValidationError) {
        res.status(400).json({
          error: 'Validation Error',
          message: 'The data provided is invalid. ',
        });
      } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({
          error: 'Database Error',
          message: err.message,
        });
      } else {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Something went wrong. Please try again later.',
        });
      }
    }
  },
  index: async (req: Request, res: Response) => {  },
  read: async (req: Request, res: Response) => {  },
  update: async (req: Request, res: Response) => {  },
  remove: async (req: Request, res: Response) => {  }
};

// Exporte o objeto inteiro como padrão
export default productController;
