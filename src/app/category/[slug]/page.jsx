import CategoryClient from "./CategoryClient";

async function fetchProducts(slug) {
 try{
      const base = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await fetch(`${base}/api/products?category=${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
 }
  
  return res.json();
} catch (error) {
  console.error("Error fetching products:", error);
  return [];
}
}

export default async function CategoryPage({ params }) {
  
  const { slug } = await params;
  const products = await fetchProducts(slug);

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 capitalize">{slug.replace("_", " ")}</h1>
      <CategoryClient products={products} />
    </div>
  );
}

export async function generateStaticParams() {
  const categories = ["laptops", "smartphones", "cctv-security", "solar-energy", "accessories"];
  return categories.map((slug) => ({ slug }));
}