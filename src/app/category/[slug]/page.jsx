import Link from "next/link";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Image from "next/image";

export default async function CategoryPage(props) {
  const params = await props.params;
  await dbConnect();

  const slug = params.slug;
  const products = await Product.find({ category: slug }).lean();

  if (!products || products.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2x1 font-bold capitalize">{slug}</h1>
        <p className="mt-4 text-gray-600">No product found in this category.</p>
      </div>
    );
  }
  return (
    <div className="p-6">
      <h1 className="text-2x1 font-bold capitalize">{slug}</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
          key={product._id}
          className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <Link href={`/product/${product.slug}`}>
            <div>
              <Image
              src={product.image}
              alt={product.name}
              height={50}
              width={50}
              className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-gray-700">
                  ₦{product.price.toLocaleString()}
                </p>
              </div>
            </div>
            </Link>
            </div>
        ))}
      </div>
    </div>
  );
}