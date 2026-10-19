import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ListingView } from "@/components/listing-view";
import { getCategories, getCategoryBySlug, getProducts } from "@/lib/catalog";

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return { title: category?.name ?? "Category" };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const products = getProducts().filter((product) => product.categoryIds.includes(category.id));

  return (
    <div className="page">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Categories", href: "/categories" }, { label: category.name }]}
      />
      <Suspense>
        <ListingView products={products} title={category.name} description={category.description} />
      </Suspense>
    </div>
  );
}
