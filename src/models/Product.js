import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    brand: { type: String },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false }, // will hold Cloudinary URL
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
