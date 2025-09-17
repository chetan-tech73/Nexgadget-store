import Image from "next/image";


   export default function HeroSection() {
    return (
      <section className="bg-white py-12">

        <div className="container mx-auto grid grid-cols-2 items-center px-8 md:px-16 gap-10">

          {/** floating shop now (Desktop only) */}
          <div className="hidden md:block absolute top-0 right-0">
            <button className="bg-purple-700 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-800 transition">
              Shop Now
            </button>
          </div>

          {/** LEFT SIDE */}
          <div className="flex flex-col items-start pace-y-6">
                {/**Logo */}
                <div className="flex items-center gap-2 mb-6">
                  <Image src="/logo.png" alt="logo" width={85} height={85} />
                  
                </div>

                {/**Heading */}

                <h1 className="text-4x1 md:text-5x1 font-bold text-gray-900 leading-snug">
                  Nex-Gen Tech, <br /> Right Here<br />  
                </h1>
                <p className="text-gray-600 text-sm md:text-base max-w-md">
                  Premium gadgets & Solar Solutions - Delivered fast in Nigeria.
                </p>

                  {/**shop now Button(mobile only) */}

                  <button className="md:hidden bg-purple-700 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-800 transition">
                    Shop Now
                  </button>
           </div>
                  {/**RIGHT SIDE */}
                  <div className="flex flex-col items-center relative space-y-3">
                    {/**Bestseller badge */}
                    <span className="absolute -top-4 left-0 bg-orange-400 text-white text-sm font-semibold px-3 py-1 rounded-md">
                    Bestseller
                    </span>

                    {/**Product image */}
                    <Image 
                    src="/iphone14.png"
                    alt="iphone 14 pro"
                    className="w-52 md:w-72"
                    width={300}
                    height={300}
                    priority
                    />
                    {/**Product name */}
                    <span className="mt-2 text-lg font-medium text-gray-800">
                      iphone 14 pro
                    </span>
                  </div>
        </div>
      </section>
    );
   }