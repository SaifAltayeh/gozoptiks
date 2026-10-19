import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/catalog";

export function CategoryShowcase() {
  const categories = getCategories().slice(0, 3);
  return (
    <section className="section">
      <div className="section-head" data-reveal>
        <h2 className="section-title">Shop by category</h2>
        <Link href="/categories" className="text-link">
          All categories
        </Link>
      </div>
      <div className="category-row" data-reveal data-reveal-stagger>
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`} className="category-item">
            <span className="category-item-media">
              <Image src={category.image} alt="" fill sizes="(max-width: 860px) 50vw, 33vw" />
            </span>
            <span className="category-item-meta">
              <span className="category-item-name">{category.name}</span>
              <span className="category-item-cta">Shop</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
