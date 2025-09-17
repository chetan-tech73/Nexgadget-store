"use client";

import React from "react";

export default function ProductRow({ product, onEdit, onDelete }) {
  return (
    <tr className="align-top">
      <td className="py-3 px-3 border-b">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-contain rounded"
            onError={(e) => (e.currentTarget.src = "/placeholder.png")}
          />
        ) : (
          <div className="w-20 h-20 bg-gray-100 flex items-center justify-center text-xs text-gray-400 rounded">
            no image
          </div>
        )}
      </td>

      <td className="py-3 px-3 border-b">
        <div className="font-medium">{product.name}</div>
        <div className="text-xs text-gray-500">{product.slug}</div>
      </td>

      <td className="py-3 px-3 border-b">₦{Number(product.price).toLocaleString()}</td>
      <td className="py-3 px-3 border-b">{product.category}</td>
      <td className="py-3 px-3 border-b max-w-xs truncate">{product.description}</td>

      <td className="py-3 px-3 border-b">
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}