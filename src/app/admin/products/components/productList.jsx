"use client";

import { useState, useEffect } from "react";

export default function ProductList({ onProductDeleted, onProductEdit }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");

      setProducts(products.filter((p) => p._id !== id));
      if (onProductDeleted) onProductDeleted(id);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (products.length === 0) return <p>No products found</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="text-center">
              <td className="border p-2">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">₦{p.price}</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2 max-w-xs truncate">{p.description}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => onProductEdit && onProductEdit(p)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}