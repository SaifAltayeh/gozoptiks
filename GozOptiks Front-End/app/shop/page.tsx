import { Suspense } from "react";
import { ListingView } from "@/components/listing-view";
import { getProducts } from "@/lib/catalog";

export const metadata = {
  title: "Shop",
};

export default function ShopPage() {
  const products = getProducts();
  return (
    <div className="page">
      <Suspense>
        <ListingView products={products} title="Shop" kicker="Catalog" />
      </Suspense>
    </div>
  );
}
