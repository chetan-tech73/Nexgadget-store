import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// GET single product
export async function GET(req, { params }) {
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const product = await Product.findById(params.id);
  return product
    ? NextResponse.json(product)
    : NextResponse.json({ error: "Product not found" }, { status: 404 });
}

// UPDATE product
export async function PUT(req, { params }) {
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const body = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    return updatedProduct
      ? NextResponse.json(updatedProduct)
      : NextResponse.json({ error: "Product not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(req, { params }) {
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const deleted = await Product.findByIdAndDelete(params.id);
  return deleted
    ? NextResponse.json({ message: "Deleted successfully" })
    : NextResponse.json({ error: "Product not found" }, { status: 404 });
}