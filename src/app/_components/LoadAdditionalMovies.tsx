"use client";

import { DNA } from "react-loader-spinner";
import { fetchMovies } from "../(pages)/movies/action";
import { Movie } from "@/types/movie-type";
import MovieTeaserCard from "./MovieTeaserCard";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

let page = 2;

export default function LoadAdditionalMovies({ searchTerm = "" }) {
  const { ref, inView } = useInView({});
  const [data, setMovies] = useState<{ movies: Movie[]; pages: number }>({
    movies: [],
    pages: page,
  });

  useEffect(() => {
    setMovies({ movies: [], pages: page });
    page = 2;
  }, [searchTerm]);

  useEffect(() => {
    async function getMovies() {
      const data = await fetchMovies(searchTerm, page++);

      setMovies((prev) => {
        return { movies: [...prev.movies, ...data.movies], pages: data.pages };
      });
    }

    if (inView) {
      if (page > data.pages || data.pages < 2) return;
      getMovies();
    }
  }, [inView, data, searchTerm]);

  return (
    <>
      <div className="movies-grid">
        {data.movies.map((movie: Movie, index) => (
          <MovieTeaserCard key={movie.id + index + ""} movie={movie} />
        ))}
      </div>

      <div
        ref={ref}
        className="load-additional-movies"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {data.pages > page && (
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        )}
      </div>
    </>
  );
}
