import { Product } from '@prisma/client';

export type ProdCreateDto = Pick<Product, 'name' | 'description' | 'price' | 'stock' | 'status'>;
export type ProdUpdateDto= Pick<Product, 'name' | 'price' | 'stock'>;
