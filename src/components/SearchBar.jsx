"use client";
import { useQuery } from "@tanstack/react-query";
import { searchMoviesAndSeries } from "@/lib/helpers";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import for navigation
import Image from "next/image";
import { Loader, Search } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import {
    Card,
    CardContent,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

export default function SearchBar() {
    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);
    const router = useRouter(); // Use Next.js router

    // Fetch data when search changes
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["search", search],
        queryFn: () => searchMoviesAndSeries(search),
        enabled: !!search,
    });

    // Close search results when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Function to handle navigation
    const handleNavigation = (item) => {
        setShowResults(false); // Hide search results
        if (item.media_type === "movie") {
            router.push(`/movie/${item.id}`); // Navigate to Movie Details Page
        } else if (item.media_type === "tv") {
            router.push(`/tv/${item.id}`); // Navigate to TV Series Details Page
        } else {
            console.warn("Unknown media type:", item);
        }
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-md mx-auto">
            {/* Search Input */}
            <div className="relative">
                <Input
                    type="search"
                    placeholder="Search here..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setShowResults(true);
                    }}
                    // className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none"
                />
                {/* <Search className="absolute right-3 top-2 text-gray-500 dark:text-gray-400 w-5 h-5" /> */}
            </div>

            {/* Search Results Dropdown */}
            {search && showResults && (
                <Card className="absolute px-1 top-full mt-2 w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg z-50 p-1">

                    <ScrollArea className="h-64">
                        {/* Loading State */}
                        {isLoading && <p className="text-center mt-2 text-gray-400 flex items-center justify-center gap-5"><Loader className="animate-spin"/> Searching...</p>}

                        {/* Error State */}
                        {isError && <p className="text-center text-red-500 mt-2">{error.message}</p>}

                        {data?.length > 0 ? (
                            data.map((item) => (
                                <div
                                    key={item.id}
                                    className="py-2 border-b hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                                    onClick={() => handleNavigation(item)}
                                >
                                    <CardContent className="flex items-center gap-3">
                                        {/* Fix Image URL */}
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                            width={50}
                                            height={50}
                                            alt={item.title || item.name}
                                            className="rounded-md w-10 h-12"
                                        />
                                        <CardTitle className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                            {item.title || item.name}
                                        </CardTitle>
                                    </CardContent>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-3">No results found</p>
                        )}
                    </ScrollArea>
                </Card>
            )}
        </div>
    );
}
