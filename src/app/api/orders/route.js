import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    // Save to DB
    const order = await Order.create(data);

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Order save error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}