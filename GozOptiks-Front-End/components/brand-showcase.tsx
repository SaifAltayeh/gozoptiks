import Image from "next/image";
import Link from "next/link";
import { getBrands, getProducts } from "@/lib/catalog";

export function BrandShowcase() {
  const brands = getBrands();
  const brand = brands[0];
  if (!brand) return null;
  const count = getProducts().filter((product) => product.brandId === brand.id).length;

  return (
    <section className="brand-stage">
      <Image src={brand.image} alt={brand.name} width={900} height={1200} />
      <div className="brand-stage-copy">
        <p className="kicker">Brand</p>
        <h2 className="display">{brand.name}</h2>
        <p className="body-lg">{brand.description}</p>
        <p className="small">{count} frames in the current catalog</p>
        <Link href={`/brands/${brand.slug}`} className="btn">
          Shop {brand.name}
        </Link>
      </div>
    </section>
  );
}
