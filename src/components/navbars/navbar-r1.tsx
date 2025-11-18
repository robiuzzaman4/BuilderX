"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type NavbarProps = {
  componentName: string;
  brandName: string;
  navItems: { name: string; href: string }[];
  ctaBtn: { text: string; href: string };
};

const NavbarR1 = ({
  brandName = "Brand",
  navItems = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#" },
  ],
  ctaBtn = { text: "Get Started", href: "#" },
}: Partial<NavbarProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200">
        <div className="px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-teal-600">
            {brandName}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-teal-600 hover:text-teal-700 transition hover:cursor-pointer bg-teal-50 p-2 rounded-md"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu with Backdrop Blur */}
        {isOpen && (
          <>
            <div className="fixed inset-0 top-16 bg-black/20 backdrop-blur-md z-40" />
            <div className="absolute top-16 left-0 right-0 bg-white/98 backdrop-blur-md border-b border-teal-200 animate-in slide-in-from-top z-50">
              <div className="flex flex-col p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2.5 text-teal-700 font-semibold hover:bg-teal-100 hover:text-teal-800 rounded-lg transition duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href={ctaBtn.href}
                  className="px-4 py-3 mt-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition text-center font-bold text-base"
                  onClick={() => setIsOpen(false)}
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
          <Link href="/" className="text-xl font-bold text-teal-600">
            {brandName}
          </Link>

          <div className="flex items-center space-x-6">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-teal-600 transition font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <Link
              href={ctaBtn.href}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
            >
              {ctaBtn.text}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarR1;
