import { cookies } from 'next/headers';
import api  from '@/utils/api';
import Cart from '@/views/cart/Cart'; 

export default async function CartPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('connect.sid');

  let formattedItems = [];

  if (sessionCookie) {
    try {
      const config = {
        headers: {
          Cookie: `${sessionCookie.name}=${sessionCookie.value}`
        }
      };

      const response = await api.get('/purchase/cart', config);
      const rawItems = response.data.purchaseItems || [];

      formattedItems = rawItems.map((item: any) => ({
        ...item.product,      
        quantity: item.quantity, 
        purchaseItemId: item.id  
      }));

    } catch (error) {
      console.log("Usuário não logado ou sessão expirada no server-side.");
    }
  }

  // Renderiza SEMPRE, mesmo vazio
  return (
    <div className="container mx-auto p-4">
      <Cart cartItems={formattedItems} />
    </div>
  );
}