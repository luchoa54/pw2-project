import { error } from "console"
import { PrismaClient } from "@prisma/client";
import getCart from "../purchase/purchase.service"

const prisma = new PrismaClient()

export const incPurchaseItem = async (userId: string, productId: string) => {
  const cart = await getCart(userId)
  const product = await prisma.product.findUnique({
    where: { id: productId }
  })

  if (!product) throw new Error("Produto não encontrado")

  let purchaseItem = await prisma.purchaseItem.findFirst({
    where: {
      purchaseId: cart.id,
      productId,
    },
  })
  if (!purchaseItem) {
    purchaseItem = await prisma.purchaseItem.create({
      data: {
        purchaseId: cart.id,
        productId,
        quantity: 1,
        priceAtPurchase: product.price
      },
    })
  } else {
    await prisma.purchaseItem.update({
        where: {
            id: purchaseItem.id,
        },
        data: {
            purchaseId: cart.id,
            productId,
            quantity:  { increment: 1 }
        }
    })
  }
}

export const decPurchaseItem = async (userId: string, productId: string) => {
  const cart = await getCart(userId)
  let purchaseItem = await prisma.purchaseItem.findFirst({
    where: {
      purchaseId: cart.id,
      productId,
    },
  })
  if (!purchaseItem) { throw new Error("Item fora do carrinho de compras")}

  if (purchaseItem.quantity === 1){
    await prisma.purchaseItem.delete({
      where: {
        id: purchaseItem.id,
        productId,
      },
    })
  } else {
    await prisma.purchaseItem.update({
        where: {
            id: purchaseItem.id,
        },
        data: {
            purchaseId: cart.id,
            productId,
            quantity:  { decrement: 1 }
        }
    })
  }
} 
