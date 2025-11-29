import api from "../utils/api";
import ProductList from "../views/product/list/ProductList";

export const dynamic = 'force-dynamic';

async function Home() {
  try {
    const response = await api.get('/product');
    const products = response.data;

    return (
      <div>
        <ProductList products={products} />
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return <div>Erro ao carregar produtos.</div>;
  }
}

export default Home;