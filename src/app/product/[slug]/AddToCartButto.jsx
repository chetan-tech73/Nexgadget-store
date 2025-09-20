"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";



export default function AddToCartButton({ product}) {
  const { addToCart } = useContext(CartContext);

  return (
    <button 
    onClick={() => addToCart(product)}
    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Add to Cart
    </button>
  );
}