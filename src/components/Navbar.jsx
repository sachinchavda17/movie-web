"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { User, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "@/lib/helpers";
import { Button } from "./ui/button";
import { ChevronDown, Search } from 'lucide-react';
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: genres, isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed top-0 right-0 z-50 flex items-center justify-between w-full p-4 transition-all duration-300 ${scrolling ? "bg-white/30 dark:bg-black/50 backdrop-blur-lg shadow-md" : "bg-transparent"
          }`}
      >
        {/* Logo */}
        <Link href={"/"} className="text-2xl font-bold tracking-wide">
          🎬 CineFlix
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {["Bollywood", "Hollywood", "South", "Web Series", "Upcoming"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              className="text-black dark:text-gray-300 hover:opacity-80 transition-all duration-200"
            >
              {item}
            </Link>
          ))}

          {/* Genre Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:opacity-80 dark:text-gray-300 transition-all duration-200 flex items-center justify-center gap-2">
              <span>Genre</span> <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:text-gray-300 border border-gray-700 shadow-lg rounded-lg p-2 w-48 h-60">
              {isLoading ? (
                <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
              ) : (
                genres?.map((genre) => (
                  <DropdownMenuItem
                    key={genre.id}
                    className="hover:bg-gray-300 dark:hover:bg-gray-800 rounded-md transition-all duration-200"
                  >
                    <Link href={`/genre/${genre.id}`} className="w-full block px-3 py-1">
                      {genre.name}
                    </Link>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>



        {/* Icons: Login, Dark Mode, Hamburger */}
        <div className="flex gap-4 items-center">
          <SearchBar/>
          <Link href="/login">
            <Button variant="outline" size="icon" className="cursor-pointer">
              <User className="w-5 h-5 transition-all hover:scale-110" />
            </Button>
          </Link>

          {/* Dark Mode Toggle */}
          <ModeToggle />

          {/* Hamburger Menu for Mobile */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden flex"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Sidebar Menu (Mobile) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setMenuOpen(false)}>
          <motion.div
            initial={{ x: "100%" }} // Open from right
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="fixed top-0 right-0 w-64 h-full bg-gray-900 dark:bg-gray-800 shadow-lg p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing on inside click
          >
            {/* Close Button */}
            <button className="self-end text-gray-400 hover:text-white transition" onClick={() => setMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-6 mt-6">
              {["Bollywood", "Hollywood", "South", "Web Series", "Upcoming"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-white dark:text-gray-300 text-lg tracking-wide transition-all hover:opacity-80"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}

              {/* Genre Dropdown for Mobile */}
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white dark:text-gray-300 text-lg tracking-wide transition-all hover:opacity-80 flex items-center justify-center gap-2">
                  <span>Genre</span> <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 dark:bg-gray-800 text-white border border-gray-700 shadow-lg rounded-lg p-2 w-48 h-56">
                  {isLoading ? (
                    <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
                  ) : (
                    genres?.map((genre) => (
                      <DropdownMenuItem
                        key={genre.id}
                        className="hover:bg-gray-800 dark:hover:bg-gray-700 rounded-md transition-all duration-200"
                      >
                        <Link href={`/genre/${genre.id}`} className="w-full block px-3 py-1">
                          {genre.name}
                        </Link>
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Login & Dark Mode for Mobile */}
            <div className="flex gap-4 items-center mt-auto">
              <Link href="/login">
                <Button variant="outline" size="icon" className="cursor-pointer">
                  <User className="w-5 h-5 transition-all hover:scale-110" />
                </Button>
              </Link>
              <ModeToggle />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
