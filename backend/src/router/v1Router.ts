import express, { Request, Response } from 'express';
import productRouter from '../resource/product/product.router';

const router = express.Router();

router.use('/product', productRouter);

async function read(req: Request, res: Response) {
    const productId = req.params.id;
    res.send(`Buscando o produto com ID: ${productId}`);
}

router.get('/product/:id', read);

export default router;