
import ProductDetailClient from "./productDetailClient";

async function fetchProduct(slug){
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/by-slug/${slug}`,
    {cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailPage({ params }) {
  const product = await fetchProduct(params.slug);
  
  return <ProductDetailClient product={product} />;
}