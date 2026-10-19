import type { Metadata, Viewport } from "next";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CartDrawer } from "@/components/cart-drawer";
import { IntroSplash } from "@/components/intro-splash";
import { MotionRoot } from "@/components/motion-root";
import { MobileNav } from "@/components/mobile-nav";
import { Providers } from "@/components/providers";
import { SearchOverlay } from "@/components/search-overlay";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { store } from "@/data/store";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: store.wordmark,
    template: `%s — ${store.wordmark}`,
  },
  description: "GozOptiks. Eyewear, considered. A customer-facing storefront for frames across brands and categories.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem("goz-intro")==="1"){document.documentElement.classList.add("intro-done");}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <noscript>
          <style>{`.intro-splash{display:none}html{overflow:auto}`}</style>
        </noscript>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Providers>
          <IntroSplash />
          <MotionRoot />
          <div className="site">
            <AnnouncementBar />
            <SiteHeader />
            <main id="main" className="site-main">
              {children}
            </main>
            <SiteFooter />
          </div>
          <SearchOverlay />
          <CartDrawer />
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
