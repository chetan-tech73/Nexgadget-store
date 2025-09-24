import Link from "next/link";

export default function ShopPage() {
    const categories = [
        {name: "Laptops", slug: "laptops" },
        {name: "smartphones", slug: "smartphones"},
        {name: "CCTV security", slug: "cctv-security"},
        {name: "Solar energy", slug: "solar-energy"},
        {name: "accessories", slug: "accessories"},
    ];

    return (
        <div className="max-w-6x1 mx-auto p-6">
        <h1 className="text-3x1 font-bold mb-6">shop by Category</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
            <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="block p-6 border rounded-lg shadow hover: shadow-lg transition"
            >
                <h2 className="text-xl font-semibold">{cat.name}</h2>
            </Link>
        ))}
        </div>
        </div>
    );
}