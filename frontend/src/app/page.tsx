import ProductList from "../views/product/list/ProductList";

async function Home() {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_DOCKER_API}/product`, 
    {
      cache: 'no-store' 
    }
  );
  
  const products = await resp.json();

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export default Home;