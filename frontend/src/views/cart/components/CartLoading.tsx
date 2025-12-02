"use client";

import { Spinner } from "flowbite-react";

export function CartLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Spinner size="xl" aria-label="Carregando carrinho" />
    </div>
  );
}