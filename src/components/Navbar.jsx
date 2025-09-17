"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      {/* Logo / Brand */}
      <Link href="/" className="font-bold text-xl">
        Nexgadget
      </Link>

      {/* Cart Icon */}
      <div className="flex items-center gap-6">
        <Link href="/cart" className="relative">
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full px-2">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}