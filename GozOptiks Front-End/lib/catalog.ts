import { brands, categories, homepageSections, heroSlides, products } from "@/data/catalog";
import type {
  Brand,
  Category,
  Product,
  ProductFilters,
  SortKey,
} from "@/lib/types";

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getBrands(): Brand[] {
  return brands;
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((brand) => brand.slug === slug);
}

export function getBrandById(id: string): Brand | undefined {
  return brands.find((brand) => brand.id === id);
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

export function getHeroSlides() {
  return heroSlides;
}

export function getHomepageSections() {
  return homepageSections.filter((section) => section.active).sort((a, b) => a.order - b.order);
}

export function getProductsByIds(ids: string[]): Product[] {
  return ids
    .map((id) => getProductById(id))
    .filter((product): product is Product => Boolean(product));
}

export function getBrandName(brandId: string): string {
  return getBrandById(brandId)?.name ?? "";
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return products.filter((product) => {
    const brand = getBrandName(product.brandId).toLowerCase();
    const categoryNames = product.categoryIds
      .map((id) => getCategoryById(id)?.name ?? "")
      .join(" ");
    const attributes = product.attributes.map((item) => item.value).join(" ");
    const haystack = [
      product.name,
      product.description,
      brand,
      categoryNames,
      attributes,
      product.frameShape,
      product.productType,
      product.colors.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function filterProducts(list: Product[], filters: ProductFilters): Product[] {
  return list.filter((product) => {
    if (filters.brand?.length && !filters.brand.includes(product.brandId)) return false;
    if (filters.category?.length && !filters.category.some((id) => product.categoryIds.includes(id))) {
      return false;
    }
    if (filters.color?.length && !filters.color.some((color) => product.colors.includes(color))) {
      return false;
    }
    if (filters.type?.length && !filters.type.includes(product.productType)) return false;
    if (filters.availability && product.stockStatus !== filters.availability) return false;
    if (filters.priceMin !== undefined && product.price < filters.priceMin) return false;
    if (filters.priceMax !== undefined && product.price > filters.priceMax) return false;
    return true;
  });
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const next = [...list];
  switch (sort) {
    case "price-asc":
      return next.sort((a, b) => a.price - b.price);
    case "price-desc":
      return next.sort((a, b) => b.price - a.price);
    case "newest":
      return next.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "alpha":
      return next.sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
    default:
      return next.sort((a, b) => Number(b.featured) - Number(a.featured) || b.createdAt.localeCompare(a.createdAt));
  }
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const fromConfig = getProductsByIds(product.relatedIds).filter((item) => item.id !== product.id);
  if (fromConfig.length >= limit) return fromConfig.slice(0, limit);

  const extras = products.filter(
    (item) =>
      item.id !== product.id &&
      !fromConfig.some((existing) => existing.id === item.id) &&
      (item.brandId === product.brandId || item.productType === product.productType),
  );
  return [...fromConfig, ...extras].slice(0, limit);
}

export function getAvailableColors(list: Product[] = products): string[] {
  return Array.from(new Set(list.flatMap((product) => product.colors))).sort();
}

export function getPriceRange(list: Product[] = products): { min: number; max: number } {
  const prices = list.map((product) => product.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function getVariationState(product: Product, variantId: string | null) {
  if (!variantId) {
    return {
      images: product.images,
      price: product.price,
      stockStatus: product.stockStatus,
      stockQuantity: product.stockQuantity,
      available: product.stockStatus === "in_stock",
      label: null as string | null,
    };
  }

  for (const variation of product.variations) {
    const option = variation.options.find((item) => item.id === variantId);
    if (option) {
      const stockStatus = option.stockStatus ?? product.stockStatus;
      return {
        images: option.images?.length ? option.images : product.images,
        price: option.price ?? product.price,
        stockStatus,
        stockQuantity: option.stockQuantity ?? product.stockQuantity,
        available: option.available && stockStatus === "in_stock",
        label: `${variation.name}: ${option.label}`,
      };
    }
  }

  return {
    images: product.images,
    price: product.price,
    stockStatus: product.stockStatus,
    stockQuantity: product.stockQuantity,
    available: product.stockStatus === "in_stock",
    label: null as string | null,
  };
}
