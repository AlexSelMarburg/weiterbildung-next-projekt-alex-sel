import { shortenString } from "@/lib/helpers";
import { Movie } from "@/types/movie-type";
import Image from "next/image";

type Props = {
  movie: Movie;
};
export default function MovieTeaserCard({ movie }: Props) {
  const hasPosterPoster = movie.poster_path !== null;

  return (
    <div
      className={`movie-teaser-card ${!hasPosterPoster ? "has-no-poster" : ""}`}
    >
      {hasPosterPoster && (
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          fill
          sizes="(100vw - 20px)"
          className="movie-teaser-card__image"
        />
      )}

      {!hasPosterPoster && (
        <>
          <h3>{shortenString(movie.title, 30)}</h3>
          <p>(kein Poster vorhanden)</p>
        </>
      )}
    </div>
  );
}
