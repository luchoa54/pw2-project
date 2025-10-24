import { ProductDto } from '../Product.types';

interface ProductDetailsProp {
    product: ProductDto
}

function ProductDetails( { product}: ProductDetailsProp) {
    return (
        <div>{ product.name } </div>
    )
}

export default ProductDetails