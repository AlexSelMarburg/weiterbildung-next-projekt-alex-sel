"use client";

import MoviesSearchForm from "./MoviesSearchForm";
import fetchMovies from "@/lib/fetchMovies";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { Movie } from "@/types/movie-type";
import { Dispatch, useEffect, useState } from "react";
import MovieTeaserCard from "./MovieTeaserCard";

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebouncedValue(searchTerm, 600);
  const [movies, setMovies] = useState<Movie[]>([]);

  useMoviesSearch(debouncedTerm, setMovies);

  return (
    <>
      <MoviesSearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="movies-grid">
        {movies.map((movie: any) => (
          <MovieTeaserCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

function useMoviesSearch(
  debouncedTerm: string,
  setMovies: Dispatch<React.SetStateAction<Movie[]>>
) {
  useEffect(() => {
    const getMovies = async () => {
      const moviesResponse = await fetchMovies(debouncedTerm);
      setMovies(moviesResponse);
    };
    getMovies();
  }, [debouncedTerm, setMovies]);
}
