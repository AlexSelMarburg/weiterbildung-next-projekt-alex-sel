import Image from "next/image";

import altHomeImageURL from "@/public/TEST-img.jpg";
import { fetchMovies } from "@/lib/fetchMovies";
import { Movie } from "@/types/movie-type";

export default async function HomePage() {
  const newMovies: Movie[] = await fetchMovies("");
  const firstMovieHasBackdrop = newMovies.find((movie) => movie.backdrop_path);

  return (
    <main className="home-page">
      <Image
        src={
          firstMovieHasBackdrop?.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${firstMovieHasBackdrop.backdrop_path}`
            : altHomeImageURL
        }
        alt="test"
        fill
        priority={true}
        className="home-page__bg"
        quality={40}
      />
      <div className="home-page__content">
        <h1>Home</h1>
        <p>Lorem ipsum dolor, sit amet consectetur</p>
      </div>
    </main>
  );
}
