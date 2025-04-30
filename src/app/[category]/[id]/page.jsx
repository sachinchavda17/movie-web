"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "@/lib/helpers";

export default function MovieDetails() {
    const { id } = useParams();

    const { data: movie, isLoading, isError, error } = useQuery({
        queryKey: ["movie"],
        queryFn: () => fetchMovieDetails(id)
    })

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
        <div className="max-w-6xl mx-auto p-6">
            {/* Movie Header */}
            <div className="flex flex-col md:flex-row items-center">
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    width={300}
                    height={450}
                    alt={movie.title}
                    className="rounded-lg shadow-lg"
                />
                <div className="md:ml-6 mt-4 md:mt-0">
                    <h1 className="text-4xl font-bold">{movie.title}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">{movie.tagline}</p>
                    <p className="mt-4 text-lg">{movie.overview}</p>
                    <p className="mt-4">📅 Release Date: {movie.release_date}</p>
                    <p>⭐ Rating: {movie.vote_average?.toFixed(1)}</p>
                </div>
            </div>

            {/* Movie Additional Details */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold">More Information</h2>
                <p>🎭 Genres: {movie.genres?.map((g) => g.name).join(", ")}</p>
                <p>⏳ Runtime: {movie.runtime} minutes</p>
                <p>🏆 Popularity: {movie.popularity}</p>
            </div>
        </div>
    );
}
