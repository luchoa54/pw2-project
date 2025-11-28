export type CartItem = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    purchaseId: string
    productId: string
    quantity: number
}

export type CartDto = CartItem[]