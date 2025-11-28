import { Purchase } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { PurchaseStatus } from "./purchase.constants";
import { PurchaseItem } from "../../generated/prisma";

const prisma = new PrismaClient()

const getCart = async (userId: string): Promise<Purchase> => {
    let cart = await prisma.purchase.findFirst({
        where: {
            userId,
            status: PurchaseStatus.cart,
        }
    })
    if (!cart) {
        cart = await prisma.purchase.create({
            data: {
                userId,
                status: PurchaseStatus.cart
            }
        })
    }
    return cart
}

const getCartItems = async (userId: string) : Promise<PurchaseItem[]> => {
    const cart = await getCart(userId)
    return prisma.purchaseItem.findMany({
        where: {
            purchaseId: cart.id
        }
    })
}

export default getCart