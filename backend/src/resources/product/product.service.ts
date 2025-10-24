import { Prisma, PrismaClient, Product } from "@prisma/client";
import { ProdCreateDto } from './product.types'; // Assumindo que você tenha este tipo
const prisma = new PrismaClient();

// Renomeei de getAllProducts para getProducts para bater com o controller
export async function getProducts(): Promise<Product[]> {
    return await prisma.product.findMany();
}

export async function getProductById(id: string): Promise<Product | null> {
    return await prisma.product.findUnique({
        where: { id },
    });
}

export async function createProduct(
    product: ProdCreateDto
): Promise<Product> {
    return await prisma.product.create({ data: product });
}

export async function updateProduct(
    id: string, 
    data: Prisma.ProductUpdateInput
): Promise<Product> {
    return await prisma.product.update({
        where: { id },
        data: data,
    });
}

export async function deleteProduct(id: string): Promise<Product> {
  
    return await prisma.product.delete({
        where: { id },
    });
}

export async function alreadyExists(name: string, id?: string): Promise<boolean> {
  
  const whereClause: Prisma.ProductWhereInput = {
    name: {
      equals: name,
    },
  };

  if (id) {
    whereClause.NOT = {
      id: id,
    };
  }

  const product = await prisma.product.findFirst({
    where: whereClause,
  });

  return !!product;
}