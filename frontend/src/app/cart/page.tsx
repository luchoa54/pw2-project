import { cookies } from 'next/headers';
import api  from '@/utils/api';
import Cart from '@/views/cart/Cart';

export default async function CartPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('connect.sid');

  if (!sessionCookie) {
    return <div className="p-10 text-center">Faça login para ver seu carrinho.</div>;
  }

  let formattedItems = [];

  try {
    const config = {
      headers: {
        Cookie: `${sessionCookie.name}=${sessionCookie.value}`
      }
    };

    const response = await api.get('/purchase/cart', config);
    const purchaseData = response.data;
    
    const rawItems = purchaseData.purchaseItems || [];

    formattedItems = rawItems.map((item: any) => ({
      ...item.product,     
      quantity: item.quantity,
      purchaseItemId: item.id 
    }));

  } catch (error: any) {
    console.error("Erro ao carregar carrinho:", error.message);
    if (error.response?.status === 401) return <div>Sessão expirada.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Cart cartItems={formattedItems} />
    </div>
  );
}