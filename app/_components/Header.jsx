"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScroll } from "../_context/ScrollContext";
import { FaInstagram, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const { packagesRef } = useScroll();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menu = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Photography", path: "/photography" },
    { id: 3, name: "Videography", path: "/videography" },
    { id: 4, name: "Portifolio", path: "/portifolio" },
    { id: 5, name: "Decorations", path: "/decorations" },
    {
      id: 6,
      name: "BOOK NOW",
      path: "/packages",
      isButton: true,
      email: "contact@apstudio.com",
    },
  ];

  const scrollToPackages = () => {
    packagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".gallery-dropdown")) {
        setIsGalleryOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 left-0 w-full z-50 bg-white text-black shadow-md overflow-x-hidden">
      <div className="flex items-center justify-between px-6 py-1 md:px-12 mx-auto">
        {/* Logo */}
        <div className="bg-[#d4d7da] h-24 w-24 flex items-center justify-center rounded-full">
  <Image src="/logo.png" alt="espe logo" width={60} height={15} />
</div>

        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden text-2xl absolute right-4 top-1/3 transform -translate-y-1/3 text-green-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* NAVIGATION + BOOK NOW BUTTON CONTAINER */}
        <div className="hidden md:flex items-center gap-8">
          {/* Navigation */}
          <ul className="flex gap-8 items-center">
            {menu.map((item) => (
              <li key={item.id} className="relative">
                {item.name === "Decorations" && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <Link
                      href="https://www.instagram.com/awesomephotographytz/"
                      target="_blank"
                      className="text-xl"
                    >
                      <FaInstagram />
                    </Link>
                  </div>
                )}
                {item.isButton ? (
                  <div className="flex flex-col items-center mb-6">
                    <span className="text-sm text-gray-600">{item.email}</span>
                    <Link href={item.path}>
                      <button
                        className="border-2 border-green-700 text-green-700 px-6 py-2 text-sm font-bold 
                          hover:bg-green-700 hover:text-white transition whitespace-nowrap"
                      >
                        {item.name}
                      </button>
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className="cursor-pointer text-green-700 transition-all ease-in-out px-4 py-2"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
            <ul className="flex flex-col items-center gap-4 py-6">
              {menu.map((item) => (
                <li key={item.id}>
                  {item.name === "Decorations" && (
                    <div className="flex flex-col items-center mb-2">
                      <Link
                        href="https://www.instagram.com/awesomephotographytz/"
                        target="_blank"
                        className="text-xl"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaInstagram />
                      </Link>
                    </div>
                  )}
                  {item.isButton ? (
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-gray-600">{item.email}</span>
                      <Link href={item.path}>
                        <button
                          className="border-2 border-green-700 text-green-700 px-8 py-2 text-sm font-bold 
                            hover:bg-green-700 hover:text-white transition mt-2"
                          onClick={() => {
                            scrollToPackages();
                            setIsMenuOpen(false);
                          }}
                        >
                          {item.name}
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className="text-green-700 px-4 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;