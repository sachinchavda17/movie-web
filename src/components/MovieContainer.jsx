import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Movie from "@/components/Movie";


export default function MovieContainer({data,category}) {
    return (
        <Card className={"m-2"}>
        <CardHeader>
        <CardTitle className={"text-2xl"}>{category.replace(/\b\w/g, (char) => char.toUpperCase())}</CardTitle>
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