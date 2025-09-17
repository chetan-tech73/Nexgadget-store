"use client";

import { useContext } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { CartContext } from "@/context/CartContext";
import { formatNaira } from "@/lib/format";
import Link from "next/link";

export default function ProductDetailClient({ product }) {
  const { addToCart } = useContext(CartContext);

  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(
      (t) => (
        <div>
          <span className="font-medium">{product.name}</span> added to cart!
          <div className="mt-2">
            <Link 
            href="/cart"
            className="text-sm text-purple-600 underline hover:text-purple-800"
            onClick={() => toast.dismiss(t.id)}
            >
              View Cart 
            </Link>
          </div>
        </div>
      ),
      { duration: 3000 }
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-6">
          {formatNaira(product.price)}
        </p>

        {/* ✅ working Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}