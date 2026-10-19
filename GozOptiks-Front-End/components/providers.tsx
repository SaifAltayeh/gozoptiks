"use client";

import { CartProvider, useCart } from "@/lib/cart-context";

function Notice() {
  const { notice } = useCart();
  if (!notice) return null;
  return (
    <div className="toast" role="status">
      {notice}
    </div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Notice />
    </CartProvider>
  );
}
