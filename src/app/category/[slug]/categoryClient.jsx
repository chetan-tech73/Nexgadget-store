"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function CategoryClient({ products = [] }) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState(""); // "" | "low-high" | "high-low"
  const [priceBand, setPriceBand] = useState(""); // "", "cheap", "mid", "expensive"

  const filtered = useMemo(() => {
    let out = [...products];

    // Search
    if (search) {
      out = out.filter((p) =>
        (p.name || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    // Price band filter
    if (priceBand === "cheap") out = out.filter((p) => p.price < 50000);
    if (priceBand === "mid") out = out.filter((p) => p.price >= 50000 && p.price <= 150000);
    if (priceBand === "expensive") out = out.filter((p) => p.price > 150000);

    // Explicit min/max
    if (minPrice) out = out.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) out = out.filter((p) => p.price <= Number(maxPrice));

    // Sort
    if (sort === "low-high") out.sort((a, b) => a.price - b.price);
    if (sort === "high-low") out.sort((a, b) => b.price - a.price);

    return out;
  }, [products, search, minPrice, maxPrice, sort, priceBand]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/3"
        />

        <select
          value={priceBand}
          onChange={(e) => setPriceBand(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/6"
        >
          <option value="">Price band</option>
          <option value="cheap">Below ₦50k</option>
          <option value="mid">₦50k–₦150k</option>
          <option value="expensive">Above ₦150k</option>
        </select>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min ₦"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border rounded px-3 py-2 w-24"
          />
          <input
            type="number"
            placeholder="Max ₦"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border rounded px-3 py-2 w-24"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/6"
        >
          <option value="">Sort</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p._id || p._id?.toString()} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}