"use client";

import Link from "next/link";
import { useEffect } from "react";
import { store } from "@/data/store";
import { getBrands, getCategories } from "@/lib/catalog";
import { useCart } from "@/lib/cart-context";
import { CloseIcon } from "@/components/icons";

export function MobileNav() {
  const { navOpen, setNavOpen, setSearchOpen } = useCart();
  const brands = getBrands();
  const categories = getCategories();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.toggle("lock", navOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body?.classList.remove("lock");
    };
  }, [navOpen, setNavOpen]);

  if (!navOpen) return null;

  return (
    <div className="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu">
      <button className="mobile-backdrop" aria-label="Close menu" onClick={() => setNavOpen(false)} />
      <div className="mobile-panel">
        <div className="mobile-head">
          <span className="wordmark">{store.wordmark}</span>
          <button className="icon-btn" type="button" aria-label="Close menu" onClick={() => setNavOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <nav className="mobile-links">
          <Link href="/shop" onClick={() => setNavOpen(false)}>
            Shop
          </Link>
          <Link href="/about" onClick={() => setNavOpen(false)}>
            About
          </Link>
          <Link href="/categories" onClick={() => setNavOpen(false)}>
            Categories
          </Link>
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`} onClick={() => setNavOpen(false)}>
              {category.name}
            </Link>
          ))}
          {brands.map((brand) => (
            <Link key={brand.id} href={`/brands/${brand.slug}`} onClick={() => setNavOpen(false)}>
              {brand.name}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setNavOpen(false)}>
            Contact
          </Link>
          <button
            type="button"
            onClick={() => {
              setNavOpen(false);
              setSearchOpen(true);
            }}
          >
            Search
          </button>
        </nav>
      </div>
    </div>
  );
}
