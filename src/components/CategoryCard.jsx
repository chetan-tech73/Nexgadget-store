import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({ title, image, href }) {
    return (
        <Link href={href} className="block">
            <div className="bd-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center text-center space-y-3 h-full">
                {/** Category Image */}
                <Image 
                src={image}
                alt={title}
                width={40}
                height={45}
                className="w-30 h-30 object-contain"
                />

                {/** Title */}
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

                {/** Browse link with icon */}
                <span className="text-purple-700 font-bold">
                    Browse &#8594;
                </span>
            </div>
        </Link>
    );
}