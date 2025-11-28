
export interface ProductDto {
    name: string,
    id: string,
    description: string,
    price: string,
    stock: number,
    status: number,
    createdAt: Date,
    updatedAt: Date
}

export interface CreateProductDto {
    name: string,
    description: string,
    price: string,
    stock: number,
}