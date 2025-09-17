import Link from "next/link";
import Image from "next/image";


export default function ProductCard({ product }) {
  const href = product?.slug ? `/product/${product.slug}` : "#";

  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <Link href={href}>
        <div>
          <div className="w-full h-48 relative bg-gray-50">
            {product?.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold line-clamp-2">{product.name}</h3>
            <p className="text-green-600 font-bold">
              ₦{Number(product.price || 0).toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
     
    </div>
  );
}