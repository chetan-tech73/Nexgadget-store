import clientPromise from "../lib/db.js";
import { ObjectId } from "bson";

const products = [
  {
    _id: new ObjectId(), 
    name: "iPhone 14 Pro",
    slug: "iphone-14-pro",
    category: "Smartphones",
    description: "Latest iPhone with ProMotion display.",
    price: 120000,
    image: "https://via.placeholder.com/300",
    stock: 10,
    createdAt: new Date(),
  },
  // add other products...
];

async function run() {
  try {
    const client = await clientPromise;
    const db = client.db("nexgadget");

    console.log("Seeding products...");

    await db.collection("products").deleteMany({});
    await db.collection("products").insertMany(products);

    console.log("Seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}

run();