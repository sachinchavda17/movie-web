"use client";

import { fetchIndianMovies, fetchMoviesByGenre } from "@/lib/helpers";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import MovieContainer from "@/components/MovieContainer";

export default function Home() {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["movies"],
        queryFn: () => fetchMoviesByGenre(id),
    });
    console.log(data)
    if (isLoading)
        return (
            <div className="flex justify-center items-center h-32 w-full">
                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    if (isError)
        return (
            <div className="text-red-700">
                Error : {isError ? error.message : "Something went wrong!!"}
            </div>
        );
    return (
        <MovieContainer data={data?.movies?.results} category={data?.genreName + " Movies"} />
    );
}
