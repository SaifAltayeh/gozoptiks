"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { store } from "@/data/store";
import { useCart } from "@/lib/cart-context";
import { BagIcon, MenuIcon, SearchIcon } from "@/components/icons";

export function SiteHeader() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, setSearchOpen, setCartOpen, setNavOpen } = useCart();

  useEffect(() => {
    if (!home) {
      setScrolled(false);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [home]);

  return (
    <header className={`header ${home ? "is-overlay" : ""} ${home && scrolled ? "is-solid" : ""}`}>
      <div className="header-inner">
        <button className="icon-btn menu-btn" type="button" aria-label="Open menu" onClick={() => setNavOpen(true)}>
          <MenuIcon />
        </button>

        <nav className="nav" aria-label="Primary">
          <Link href="/shop" className="nav-btn" aria-current={pathname === "/shop" ? "page" : undefined}>
            Shop
          </Link>
          <Link href="/about" className="nav-btn" aria-current={pathname.startsWith("/about") ? "page" : undefined}>
            About
          </Link>
          <Link href="/categories" className="nav-btn" aria-current={pathname.startsWith("/categories") ? "page" : undefined}>
            Categories
          </Link>
        </nav>

        <Link href="/" className="wordmark" aria-label={`${store.wordmark} home`}>
          {store.wordmark}
        </Link>

        <div className="header-actions">
          <button className="icon-btn" type="button" aria-label="Search" onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </button>
          <button className="icon-btn" type="button" aria-label="Open cart" onClick={() => setCartOpen(true)}>
            <BagIcon />
            {itemCount > 0 ? <span className="cart-count">{itemCount}</span> : null}
          </button>
        </div>
      </div>
    </header>
  );
}
