import { CategoryShowcase } from "@/components/category-showcase";
import { EditorialBanner } from "@/components/editorial-banner";
import { HeroSlider } from "@/components/hero-slider";
import { ProductSection } from "@/components/product-section";
import { getHeroSlides, getHomepageSections } from "@/lib/catalog";

export default function HomePage() {
  const slides = getHeroSlides();
  const sections = getHomepageSections();

  return (
    <>
      <HeroSlider slides={slides} />
      <CategoryShowcase />
      {sections[0] ? <ProductSection section={sections[0]} /> : null}
      <EditorialBanner
        kicker="Optical"
        title="Close to the face"
        text="Studio portraits from the Indie Soul campaign. Thick acetate, direct light, no extra story attached."
        image="/images/editorial/indie-01.jpg"
        href="/categories/optical"
        cta="Shop optical"
        variant="panel"
      />
      {sections[1] ? <ProductSection section={sections[1]} /> : null}
      {sections[2] ? <ProductSection section={sections[2]} /> : null}
    </>
  );
}
