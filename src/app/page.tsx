import Image from "next/image";

import altHomeImageURL from "@/public/img/fallback-hero-bg.jpeg";
import popcorn from "@/public/img/popcorn.png";
import { fetchpopularMovies } from "@/src/app/(pages)/movies/action";

export const revalidate = 600;

export default async function HomePage() {
  const { movies } = await fetchpopularMovies();
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
        quality={60}
      />
      <div className="home-page-content">
        <div className="left-container">
          <h1>
            <span className="highlight">Next.js</span> - Weiterbildung
            <br />
            Projekt
          </h1>
          <ul>
            <li>
              <p>
                Browse Movies in <span className="highlight">TMDB</span> - The
                Movie Database - API
              </p>
            </li>
            <li>
              <p>
                <span className="highlight">Login</span> to bookmark movies and
                save your favorites in a Database
              </p>
            </li>
            <li>
              <p>
                <span className="highlight">Rate</span> your favorite movies
              </p>
            </li>
          </ul>
        </div>
        <div className="right-container">
          <Image
            src={popcorn}
            alt="test"
            priority={true}
            className="popcorn-img"
            quality={60}
          />
        </div>
      </div>
    </main>
  );
}
