"use client";

import { useContext, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CartContext } from "@/context/CartContext";
import { formatNaira } from "@/lib/format";
import { buildWhatsAppCartMessage, buildWAUrl, generateOrderId } from "@/lib/whatsapp";

export default function CheckoutPage() {
  const { cart } = useContext(CartContext);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const total = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const qty = item.qty ?? item.quantity ?? 1;
        return sum + (Number(item.price || 0) * qty);
      }, 0),
    [cart]
  );

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const brand = process.env.NEXT_PUBLIC_BRAND_NAME || "Nexgadget";

  const handleWhatsAppCheckout = async () => {
    if (!waNumber) {
      alert("WhatsApp number not configured");
      return;
    }
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill in your name, phone, and address");
      return;
    }

    const orderId = generateOrderId("NXG");

    // Build order payload
    const payload = {
      orderId,
      customer,
      cart: cart.map((item) => ({
        productId: item._id || item.slug,
        name: item.name,
        price: item.price,
        qty: item.qty ?? item.quantity ?? 1,
        image: item.image || "",
      })),
      total,
    };

    try {
      // Save order in DB
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        console.error("Order not saved:", data.error);
        alert("Error saving order. Try again.");
        return;
      }

      // Generate WhatsApp message
      const message = buildWhatsAppCartMessage(cart, total, brand, customer, orderId);
      const url = buildWAUrl(waNumber, message);

      // Open WhatsApp
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link
            href="/"
            className="inline-block px-5 py-3 rounded-lg bg-purple-600 text-white font-medium"
          >
            Continue shopping &#8594;
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Order summary */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
            <div className="bg-white rounded-lg shadow divide-y">
              {cart.map((item) => {
                const qty = item.qty ?? item.quantity ?? 1;
                const lineTotal = (item.price || 0) * qty;
                return (
                  <div key={item._id || item.slug} className="flex items-center gap-3 p-4">
                    <div className="relative w-14 h-14 rounded overflow-hidden bg-gray-100">
                      {item.image && (
                        <Image src={item.image} alt={item.name} fill className="object-contain" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatNaira(item.price)} × {qty}
                      </p>
                    </div>
                    <p className="font-semibold">{formatNaira(lineTotal)}</p>
                  </div>
                );
              })}
            </div>
            <div className="text-right mt-4">
              <p className="text-gray-600">Total:</p>
              <p className="text-xl font-bold">{formatNaira(total)}</p>
            </div>
          </div>

          {/* Right: Customer form */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Customer Details</h2>
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <input
                type="text"
                placeholder="Full name"
                className="w-full border px-3 py-2 rounded"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full border px-3 py-2 rounded"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              />
              <textarea
                placeholder="Delivery address"
                rows={3}
                className="w-full border px-3 py-2 rounded"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              />
              <textarea
                placeholder="Notes (optional)"
                rows={2}
                className="w-full border px-3 py-2 rounded"
                value={customer.notes}
                onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
              />

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full px-5 py-3 rounded-lg bg-green-600 text-white font-medium"
              >
                Checkout via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}