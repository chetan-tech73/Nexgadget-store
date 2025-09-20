import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Image from "next/image";
import AddToCartButton from "./AddToCartButto";

export default async function ProductPage(props){
  const params = await props.params;
  await dbConnect();

  const product = await Product.findOne({ slug: params.slug }).lean();

  if (!product) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Product nt found</h1>
        <p className="mt-2 text-gray-600">Sorry, this product does not exist.</p>
      </div>
    );
  }

  //convert MongoDB doc to plain object
  const plainProduct = JSON.parse(JSON.stringify(product));

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/**product Image */}
      <div className="border rounded-lg overflow-hidden">
        <Image
        src={product.image}
        alt={product.name}
        height={45}
        width={45}
        className="w-full h-90 object-cover"
        />
      </div>

      {/** product Info */}
      <div>
        <h1 className="text-3x1 font-bold mb-4">{plainProduct.name}</h1>
        <p className="text-gray-600 mb-4">{plainProduct.description}</p>
        <p className="text-2x1 font-semibold text-green-600 mb-6">
          ₦{plainProduct.price.toLocaleString()}
        </p>

        {/** Add to Cart */}
        <AddToCartButton product={plainProduct} />
      </div>
    </div>
  );
}

