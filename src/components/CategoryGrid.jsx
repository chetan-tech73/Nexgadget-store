import CategoryCard from "./CategoryCard";

export default function CategoryGrid() {
    const categories = [
    {
        title: 'Smartphones',
        image: '/categories/smartphone.png',
        href: '/category/smartphones',
    },
    {
        title: 'Solar-energy',
        image: '/categories/solar.png',
        href: '/category/solar-energy',
    },
    {
        title: 'Laptops',
        image: '/categories/laptop.png',
        href: '/category/laptops',
    },
    {
        title: 'Cctv-Security',
        image: '/categories/cctv.png',
        href: '/category/cctv-security',
    },
    {
        title: 'Accessories',
        image: '/categories/accessories.png',
        href: '/category/accessories',
    },
    ];

    return(
        <section className="bg-gray-50 py-12">
            <div className="container mx-auto px-6 md:px-12">
                {/** Section Heading */}
                <h2 className="text-2x1 md:text-3x1 font-bold text-gray-900 mb-8 text-center">
                    Shop By Category
                </h2>

                {/** Grid layout */}
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {categories.map((cat) =>(
                        <CategoryCard
                        key={cat.title}
                        title={cat.title}
                        image={cat.image}
                        href={cat.href}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}