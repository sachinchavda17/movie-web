import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Movie({ movie }) {
  return (
    <Link href={`/movie/${movie.id}`} className="group">
      <Card className="w-full pt-0 bg-gray-100 dark:bg-gray-800 shadow-lg hover:scale-105 transition-transform duration-300">
        {/* Movie Poster */}
        <CardHeader className="p-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            width={500}
            height={750}
            loading="lazy"
            alt={movie?.title || "Movie Poster"}
            className="w-full object-cover rounded-t-lg"
          />
        </CardHeader>

        {/* Movie Info */}
        <CardContent className="px-4">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            {movie.title}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-2">
            {movie?.overview}
          </CardDescription>
        </CardContent>

        {/* Footer (Release Date & Rating) */}
        <CardFooter className="px-4 flex justify-between text-gray-500 dark:text-gray-400 text-sm">
          <span>📅 {movie?.release_date}</span>
          <span>⭐ {movie?.vote_average.toFixed(1)}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
