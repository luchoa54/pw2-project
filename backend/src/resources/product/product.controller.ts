import { Request, Response } from "express"
import {
  createProduct,
  alreadyExists,
  getProducts, // Assumido
  getProductById, // Assumido
  updateProduct, // Assumido
  deleteProduct, // Assumido
} from "./product.service"
import { Prisma } from "@prisma/client"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

/**
 * Lida com erros conhecidos do Prisma e erros genéricos.
 * @param err O objeto de erro
 * @param res O objeto de resposta do Express
 */
const handleError = (err: unknown, res: Response) => {
  if (err instanceof Prisma.PrismaClientValidationError) {
    // Erro de validação (ex: campos faltando, tipo errado)
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: ReasonPhrases.BAD_REQUEST,
      message: "Os dados fornecidos são inválidos ou estão incompletos.",
    })
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Erro conhecido do Prisma (ex: 'not found' ao deletar)
    if (err.code === "P2025") {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: ReasonPhrases.NOT_FOUND,
        message: "O registro solicitado não foi encontrado.",
      })
    }
    // Outros erros de banco (ex: unique constraint)
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: ReasonPhrases.BAD_REQUEST,
      message: err.message,
    })
  }

  // Erros inesperados
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    message: "Ocorreu um erro inesperado no servidor.",
  })
}

const productController = {
  create: async (req: Request, res: Response) => {
    try {
      const product = req.body

      if (await alreadyExists(product.name)) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ message: "Um produto com este nome já existe." })
      }

      const newProduct = await createProduct(product)

      res.status(StatusCodes.CREATED).json(newProduct)
    } catch (err) {
      handleError(err, res)
    }
  },
  index: async (req: Request, res: Response) => {
    try {
      const products = await getProducts()
      res.status(StatusCodes.OK).json(products)
    } catch (err) {
      handleError(err, res)
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: ReasonPhrases.BAD_REQUEST,
          message: "O ID do produto é obrigatório.",
        })
      }
      const product = await getProductById(id)

      if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: ReasonPhrases.NOT_FOUND,
          message: "Produto não encontrado.",
        })
      }
      res.status(StatusCodes.OK).json(product)
    } catch (err) {
      handleError(err, res)
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: ReasonPhrases.BAD_REQUEST,
          message: "O ID do produto é obrigatório.",
        })
      }
      const productData = req.body
      if (productData.name) {
        if (await alreadyExists(productData.name, id)) {
          return res
            .status(StatusCodes.CONFLICT)
            .json({ message: "Um produto com este nome já existe." })
        }
      }

      const updatedProduct = await updateProduct(id, productData)
      res.status(StatusCodes.OK).json(updatedProduct)
    } catch (err) {
      handleError(err, res)
    }
  },

  /**
   * Remove um produto pelo ID
   */
  remove: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: ReasonPhrases.BAD_REQUEST,
          message: "O ID do produto é obrigatório.",
        })
      }
      await deleteProduct(id)
      res.status(StatusCodes.NO_CONTENT).send()
    } catch (err) {
      handleError(err, res)
    }
  },
}

export default productController
