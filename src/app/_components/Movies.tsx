"use client";

import MoviesSearchForm from "./MoviesSearchForm";
// import { fetchMovies } from "@/lib/fetchMovies";
import { fetchMovies } from "../(pages)/movies/action";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { Movie } from "@/types/movie-type";
import { Dispatch, useEffect, useState } from "react";
import MovieTeaserCard from "./MovieTeaserCard";
import LoadAdditionalMovies from "./LoadAdditionalMovies";

export const revalidate = 300;

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebouncedValue(searchTerm, 600);
  const [movies, setMovies] = useState<Movie[]>([]);

  useMoviesSearch(debouncedTerm, setMovies);

  return (
    <>
      <MoviesSearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {movies.length === 0 && searchTerm !== "" && <h3>No movies found!</h3>}
      {movies.length > 0 && (
        <div className="movies-grid">
          {movies.map((movie: Movie) => (
            <MovieTeaserCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      {movies && movies.length > 0 && (
        <LoadAdditionalMovies searchTerm={searchTerm} />
      )}
    </>
  );
}

function useMoviesSearch(
  debouncedTerm: string,
  setMovies: Dispatch<React.SetStateAction<Movie[]>>
) {
  useEffect(() => {
    const getMovies = async () => {
      const { movies } = await fetchMovies(debouncedTerm);
      setMovies(movies);
    };
    getMovies();
  }, [debouncedTerm, setMovies]);
}
