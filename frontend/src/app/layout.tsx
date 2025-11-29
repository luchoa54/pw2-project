import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar/NavBar";
import CounterProvider from "@/providers/CounterProvider/CounterProvider";
import AuthProvider from "@/providers/AuthProvider/AuthProvider";
import CartProvider from "@/providers/CartProvider/CartProvider";

export const metadata: Metadata = {
  title: "Lojinha de PW2",
  description: "Criadas na aula de PW2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CounterProvider>
            <CartProvider>
              <NavBar />
              <div className="container mx-auto mt-6">{children}</div>
            </CartProvider>
          </CounterProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
