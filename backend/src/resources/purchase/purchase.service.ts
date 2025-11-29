import { Purchase } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { PurchaseStatus } from "./purchase.constants";
const prisma = new PrismaClient()

const getCart = async (userId: string): Promise<any> => { 
    let cart = await prisma.purchase.findFirst({
        where: {
            userId,
            status: PurchaseStatus.cart,
        },
        include: {
            purchaseItems: {
                include: {
                    product: true
                }
            } 
        }
    })

    if (!cart) {
        cart = await prisma.purchase.create({
            data: {
                userId,
                status: PurchaseStatus.cart
            },
            include: {
                purchaseItems: true
            }
        })
    }
    
    return cart
}

const getCartItems = async (userId: string) => {
    const cart = await getCart(userId)
    return cart.purchaseItems;
}

export default getCart