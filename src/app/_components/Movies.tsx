"use client";

import MoviesSearchForm from "./MoviesSearchForm";
import { fetchMovies } from "../(pages)/movies/action";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { Movie } from "@/types/movie-type";
import { Dispatch, useEffect, useState } from "react";
import MovieTeaserCard from "./MovieTeaserCard";
import LoadAdditionalMovies from "./LoadAdditionalMovies";
import { BookmarkedMovie } from "@prisma/client";

export const revalidate = 300;

export default function Movies({
  bookmarks = [],
}: {
  bookmarks: BookmarkedMovie[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebouncedValue(searchTerm, 600);
  const [movies, setMovies] = useState<Movie[]>([]);
  useMoviesSearch(debouncedTerm, setMovies);

  const unratedBookmarks = bookmarks.filter((bookmark) => !bookmark.rated);

  return (
    <>
      <MoviesSearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {movies.length === 0 && searchTerm !== "" && <h3>No movies found!</h3>}
      {movies.length > 0 && (
        <div className="movies-grid">
          {movies
            .filter(
              (movie: Movie) =>
                !bookmarks.some(
                  (bookmark) => bookmark.movieID === movie.id && bookmark.rated
                )
            )
            .map((movie: Movie) => (
              <MovieTeaserCard
                key={movie.id}
                movie={movie}
                isBookmarked={bookmarks.some(
                  (bookmark) => bookmark.movieID === movie.id
                )}
              />
            ))}
        </div>
      )}
      {movies && movies.length > 0 && (
        <LoadAdditionalMovies searchTerm={searchTerm} bookmarks={bookmarks} />
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
