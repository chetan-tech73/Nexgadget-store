"use client";

import { useState } from "react";
import ProductList from "./components/productList";
import ProductForm from "./components/productForm";

export default function AdminProductsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editProduct, setEditProduct] = useState(null);

  // Refresh product list after add/delete
  const handleProductAdded = () => {
    setRefreshKey((prev) => prev + 1);
    setEditProduct(null); // reset form
  };

  const handleProductDeleted = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleProductEdit = (product) => {
    setEditProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll up to form
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      {/* Product Form */}
      <div className="mb-8 p-4 border rounded bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <ProductForm
          existingProduct={editProduct}
          onProductSaved={handleProductAdded}
        />
      </div>

      {/* Product List */}
      <div className="p-4 border rounded bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <ProductList
          key={refreshKey} // forces re-fetch when key changes
          onProductDeleted={handleProductDeleted}
          onProductEdit={handleProductEdit}
        />
      </div>
    </div>
  );
}