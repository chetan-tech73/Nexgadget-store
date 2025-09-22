"use client";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">Nexgadget</h2>
          <p className="mt-3 text-sm">
           Premium gadgets for everyday life.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-white">Shop</Link></li>
            <li><Link href="/category/laptops" className="hover:text-white">Laptops</Link></li>
            <li><Link href="/category/smartphones" className="hover:text-white">Smartphones</Link></li>
            <li><Link href="/category/solar-energy" className="hover:text-white">Solar Energy</Link></li>
            <li><Link href="/category/cctv-security" className="hover:text-white">Cctv Security</Link></li>
            <li><Link href="/category/accessories" className="hover:text-white">Accessories</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Get in Touch</h3>
          <a
            href="https://wa.me/2348106948873"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mt-1 hover:text-white"
          >
            <FaWhatsapp className="text-green-500" /> WhatsApp Support
          </a>
          <p className="text-sm mt-2">📧 support@nexgadget.com</p>

          {/* Socials */}
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.facebook.com/share/1BMo1WvZh9/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://www.instagram.com/nexgadgetst?igsh=MWJ5MGF3YWFxaW41ZQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaInstagram size={18} />
            </a>
            
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 text-center py-4 text-sm border-t border-gray-700">
        © {year} Nexgadget. All rights reserved.
      </div>
    </footer>
  );
}