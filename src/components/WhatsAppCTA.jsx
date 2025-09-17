export default function WhatsAppCTA() {
  // Replace with your wa.me link
  const whatsappLink = "https://wa.link/m17w47";

  return (
    <section className="bg-purple-700 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
        {/* Text */}
        <p className="text-lg font-semibold text-center sm:text-left">
          Got questions or ready to order?
        </p>

        {/* Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          {/* WhatsApp Icon (inline SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="h-6 w-6 mr-2 fill-current"
          >
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.648.737 5.15 2.139 7.347L4 29l6.828-2.105A12.928 12.928 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22a9.93 9.93 0 0 1-5.104-1.398l-.364-.216-4.055 1.249 1.252-3.955-.236-.375A9.93 9.93 0 0 1 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.441-7.557c-.297-.149-1.758-.867-2.031-.965-.273-.099-.472-.148-.67.149-.197.297-.768.965-.941 1.162-.173.198-.347.223-.644.074-.297-.149-1.253-.462-2.387-1.475-.882-.786-1.477-1.757-1.65-2.054-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.149-.669-1.612-.916-2.206-.242-.579-.487-.5-.67-.51l-.571-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.096 3.202 5.08 4.487.711.306 1.265.489 1.697.626.713.227 1.362.195 1.874.118.572-.085 1.758-.718 2.007-1.41.248-.693.248-1.287.173-1.411-.074-.124-.272-.198-.57-.347z" />
          </svg>

          <span className="font-medium">Chat with Nexgadget Now</span>
        </a>
      </div>
    </section>
  );
}