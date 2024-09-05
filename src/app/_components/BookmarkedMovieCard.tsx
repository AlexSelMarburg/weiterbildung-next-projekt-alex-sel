import { BookmarkedMovie, DetailedMovie } from "@/types/movie-type";
import { useEffect, useState } from "react";
import { fetchMovie } from "../(pages)/movies/action";
import Image from "next/image";
import StarRating from "./StarRating";

export const revalidate = 60;
export default function BookmarkedMovieCard({
  bookmark,
}: {
  bookmark: BookmarkedMovie;
}) {
  const [movie, setMovie] = useState<DetailedMovie>();
  useEffect(() => {
    async function fetchBookmarkedMovie(id: string) {
      try {
        const movie: DetailedMovie = await fetchMovie(id);
        setMovie(movie);
      } catch (error) {}
    }

    fetchBookmarkedMovie(bookmark.movieID + "");
  }, [bookmark]);

  console.log("MOVIE:", movie);

  if (!movie) return null;

  return (
    <div className="bookmarked-movie">
      {movie.backdrop_path && (
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title || ""}
          fill
          priority={true}
          className="bookmarked-bg-image"
        />
      )}

      <div className="data-overlay">
        <div className="headings">
          <h3>{movie.title}</h3>
          {movie.original_title && movie.original_title !== movie.title && (
            <h4>({movie.original_title})</h4>
          )}
        </div>
        <div className="actions">
          <div className="left">
            <div className="ratings">
              <div className="tmdb-raiting">
                <p>
                  TMDB: {movie.vote_average}{" "}
                  <span>(votes: {movie.vote_count})</span>
                </p>
              </div>
              <div className="my-stars-raiting">
                <StarRating bookmark={bookmark} />
              </div>
            </div>
          </div>
          <div className="right">
            <button
              className="to-tmdb-btn"
              onClick={() => {
                window.open(`https://www.themoviedb.org/movie/${movie.id}`);
              }}
            >
              Bei TMDB anschauen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
