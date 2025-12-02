"use client";

import { Button, Card } from "flowbite-react";

interface CartSummaryProps {
  total: number;
}

export function CartSummary({ total }: CartSummaryProps) {
  return (
    <div className="flex justify-end mt-8">
      <Card className="max-w-sm w-full">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              R$ {total.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}