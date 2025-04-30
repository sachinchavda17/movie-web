"use client";

import { fetchIndianMovies } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import MovieContainer from "@/components/MovieContainer";

export default function Home() {
    const { category } = useParams()
    const query = useQuery({
        queryKey: ["movies"],
        queryFn: () => fetchIndianMovies(category),
    });

    if (query.isLoading)
        return (
            <div className="flex justify-center items-center h-32 w-full">
                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    if (query.isError)
        return (
            <div className="text-red-700">
                Error : {query.isError ? query.error.message : "Something went wrong!!"}
            </div>
        );
    return (
       <MovieContainer data={query?.data} category={category} key={query.data?.id}/>
    );
}
