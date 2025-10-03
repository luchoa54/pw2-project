import { PrismaClient, Product } from "@prisma/client";
import { ProdCreateDto } from './product.types';
const prisma = new PrismaClient();

export async function getAllProducts(): Promise<Product[]> {
    return await prisma.product.findMany();
}

export async function createProduct(
product: ProdCreateDto
): Promise<Product> {
return await prisma.product.create({ data: product });
}

export async function alreadyExists(name: string): Promise<boolean> {
  const product = await prisma.product.findFirst({
    where: {
      name: {
        equals: name,
      },
    },
  });
  return !!product;
}

