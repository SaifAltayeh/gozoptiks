import Link from "next/link";
import { store } from "@/data/store";
import { getBrands, getCategories } from "@/lib/catalog";

export function SiteFooter() {
  const brands = getBrands();
  const categories = getCategories();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-grid" data-reveal>
        <div>
          <Link href="/" className="wordmark">
            {store.wordmark}
          </Link>
          <p style={{ marginTop: "1rem", maxWidth: "22rem" }}>
            Eyewear, considered. A customer-facing storefront built around the GozOptiks wordmark and supplied campaign photography.
          </p>
        </div>
        <div>
          <h2>Shop</h2>
          <ul>
            <li>
              <Link href="/shop">All frames</Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/categories/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Brands</h2>
          <ul>
            {brands.map((brand) => (
              <li key={brand.id}>
                <Link href={`/brands/${brand.slug}`}>{brand.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Store</h2>
          <ul>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            {store.contact.phone ? (
              <li>
                <a href={`tel:${store.contact.phone.replace(/\s/g, "")}`}>{store.contact.phone}</a>
              </li>
            ) : (
              <li>Phone to be confirmed</li>
            )}
            {store.contact.email ? (
              <li>
                <a href={`mailto:${store.contact.email}`}>{store.contact.email}</a>
              </li>
            ) : (
              <li>Email to be confirmed</li>
            )}
            {store.contact.instagram ? (
              <li>
                <a href={store.contact.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
            ) : null}
            {store.contact.social.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <small>
          © {year} {store.wordmark}
        </small>
        <small>Demo catalog. Live inventory, payments, and email require backend configuration.</small>
      </div>
    </footer>
  );
}
