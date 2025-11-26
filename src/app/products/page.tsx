import ProductsPageClient from "./ProductsPageClient";

interface PageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  return <ProductsPageClient categorySlug={params.category} />;
}
