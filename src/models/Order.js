import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customer: {
      name: String,
      phone: String,
      address: String,
      notes: String,
    },
    cart: [
      {
        productId: String,
        name: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);