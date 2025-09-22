import "./globals.css";
import { Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nexgadget Store",
  description: "Your one-stop gadget store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />

          {children}

          <Toaster position="top-right" reverseOrder={false} />

        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
