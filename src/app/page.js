"use client";

import { fetchIndianMovies } from "@/lib/helpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Movie from "@/components/Movie";

export default function Home() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["movies"],
    queryFn: () => fetchIndianMovies("trendings"),
  });

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
    <Card className={"m-2"}>
      <CardHeader>
        <CardTitle className={"text-2xl"}>Trendings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-5 p-2 w-full">
          {data?.map((movie) => (
            <Movie movie={movie} key={movie.title} />
          ))}
        </div>
      </CardContent>
      {/* <CardFooter></CardFooter> */}
    </Card>
  );
}
