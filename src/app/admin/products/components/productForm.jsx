"use client";
import { useState } from "react";

export default function ProductForm({ existingProduct = null, onProductSaved }) {
  const [name, setName] = useState(existingProduct?.name || "");
  const [price, setPrice] = useState(existingProduct?.price || "");
  const [stock, setStock] = useState(existingProduct?.stock || "");
  const [category, setCategory] = useState(existingProduct?.category || "");
  const [description, setDescription] = useState(existingProduct?.description || "");
  const [image, setImage] = useState(existingProduct?.image || "");
  const [loading, setLoading] = useState(false);

  //  Upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "nexgadget"); 

    try {
      setLoading(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dugrmvsmp/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      let uploadRes;
      try {
        uploadRes = await res.json();
      } catch {
        throw new Error("Cloudinary did not return valid JSON.");
      }

      if (!res.ok) {
        throw new Error(
          `Cloudinary error: ${uploadRes?.error?.message || "Unknown error"}`
        );
      }

      if (!uploadRes.secure_url) {
        throw new Error("No secure_url in Cloudinary response.");
      }

      setImage(uploadRes.secure_url);
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      alert("Image upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  //  Reset form
  const resetForm = () => {
    setName("");
    setPrice("");
    setStock("");
    setCategory("");
    setDescription("");
    setImage("");
  };

  //  Submit (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      name,
      price,
      stock,
      category,
      description,
      image,
    };

    try {
      let res;
      if (existingProduct) {
        // Update product
        res = await fetch(`/api/products/${existingProduct._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
      } else {
        // Add new product
        res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
      }

      if (!res.ok) throw new Error("Failed to save product");

      alert(
        existingProduct
          ? "✅ Product updated successfully!"
          : "✅ Product added successfully!"
      );

      resetForm();
      if (onProductSaved) onProductSaved();
    } catch (err) {
      console.error(err);
      alert("Failed to save product. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 shadow rounded-md"
    >
      <h2 className="text-xl font-bold mb-2">
        {existingProduct ? "Edit Product" : "Add Product"}
      </h2>

      {/* Product Name */}
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      {/* Price */}
      <input
        type="number"
        placeholder="Price (₦)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      {/* Stock */}
      <input
        type="number"
        placeholder="Stock Quantity"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Category</option>
        <option value="laptops">Laptops</option>
        <option value="smartphones">Smartphones</option>
        <option value="cctv-security">CCTV Security</option>
        <option value="solar-energy">Solar Energy</option>
	<option value="accessories">Accessories</option>
      </select>

      {/* Description */}
      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        rows={4}
        required
      />

      {/* Image Upload */}
      <div>
        <input type="file" onChange={handleImageUpload} />
        {image && (
          <img
            src={image}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : existingProduct
          ? "Update Product"
          : "Add Product"}
      </button>
    </form>
  );
}
