"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  brandName: string;
  navItems: { name: string; href: string }[];
  ctaBtn: { text: string; href: string };
}

const Navbar5 = ({
  brandName = "Brand",
  navItems = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#" },
  ],
  ctaBtn = { text: "Sign In", href: "#" },
}: Partial<NavbarProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200">
        <div className="px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            {brandName}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-600 hover:text-blue-700 transition hover:cursor-pointer bg-blue-50 p-2 rounded-md"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu with Backdrop Blur */}
        {isOpen && (
          <>
            <div className="fixed inset-0 top-16 bg-black/20 backdrop-blur-md z-40" />
            <div className="absolute top-16 left-0 right-0 bg-white/98 backdrop-blur-md border-b border-blue-200 animate-in slide-in-from-top z-50">
              <div className="flex flex-col p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2.5 text-blue-700 font-semibold hover:bg-blue-100 hover:text-blue-800 rounded-lg transition duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href={ctaBtn.href}
                  className="px-4 py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center font-bold text-base"
                >
                  {ctaBtn.text}
                </Link>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Desktop Navbar */}
      <nav className="hidden md:flex w-full bg-white py-4 border-b border-zinc-200">
        <div className="w-full max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-xl font-bold text-blue-600">
              {brandName}
            </Link>

            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href={ctaBtn.href}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {ctaBtn.text}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar5;
