"use client";

import { useContext } from "react";
import Image from "next/image";
import { CartContext } from "@/context/CartContext";
import { formatNaira } from "@/lib/format";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const itemsText = cart
      .map(
        (item) =>
          `${item.qty} × ${item.name} - ${formatNaira(item.price * item.qty)}`
      )
      .join("\n");

    const message = `Hello, I want to order:\n${itemsText}\n\nTotal: ${formatNaira(
      total
    )}`;

    const phone = "2348106948873"; // ✅  WhatsApp number
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center gap-4">
                  {/* ✅ Product Image */}
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">
                      {formatNaira(item.price)} × {item.qty} ={" "}
                      {formatNaira(item.price * item.qty)}
                    </p>
                  </div>
                </div>

                {/* ✅ Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item._id, item.qty - 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                    disabled={item.qty <= 1}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item._id, item.qty + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Cart Total */}
          <h2 className="text-xl font-semibold mt-6">
            Total: {formatNaira(total)}
          </h2>

          {/* ✅ Cart Actions */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={clearCart}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Clear Cart
            </button>
            <button
              onClick={handleWhatsAppCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Checkout via WhatsApp
            </button>
          </div>
        </>
      )}
    </div>
  );
}