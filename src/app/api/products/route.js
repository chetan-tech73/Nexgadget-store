import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import slugify from "slugify";


//POST = Add product
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    console.log(" Incoming product body:", body);

    //Auto-Generate slug & defaukt stock if missing
    const productData = {
      ...body,
      slug: body.slug || slugify(body.name, { lower: true }),
      stock: body.stock ?? 0,
    };
    
    const product = new Product(productData);
    await product.save();
    console.log("Product created:", product);
    
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error("Error creating product:", err.message);
    return NextResponse.json(
      { error: err.message }, { status: 500});
  }

}

//Get all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).lean();
    return NextResponse.json(products, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });

  } catch (err) {
    console.error("Error fetching products:", err.message, err.stack);
    return NextResponse.json(
      { error: "Failed to fetch products", details: err.message},
      { status: 500 }
    );
  }
  
}