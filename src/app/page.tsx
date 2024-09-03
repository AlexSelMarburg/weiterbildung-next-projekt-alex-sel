import Image from "next/image";

import altHomeImageURL from "@/public/TEST-img.jpg";
import { fetchMovies } from "@/src/app/(pages)/movies/action";
import { Movie } from "@/types/movie-type";

export default async function HomePage() {
  const { movies } = await fetchMovies("");
  const firstMovieHasBackdrop = movies.find((movie) => movie.backdrop_path);

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
        quality={50}
      />
      <div className="home-page__content">
        <h1>Home</h1>
        <p>Lorem ipsum dolor, sit amet consectetur</p>
      </div>
    </main>
  );
}
