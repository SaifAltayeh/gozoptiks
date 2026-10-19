import { CartPageView } from "@/components/cart-page";

export const metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <div className="page">
      <CartPageView />
    </div>
  );
}
