import { shortenString } from "@/lib/helpers";
import { Movie } from "@/types/movie-type";
import Image from "next/image";
import Link from "next/link";

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
          quality={30}
        />
      )}

      {!hasPosterPoster && (
        <>
          <h3>{shortenString(movie.title, 30)}</h3>
          <p>(kein Poster vorhanden)</p>
        </>
      )}

      <div className="actions">
        <Link className="link-btn" href={`/movies/${movie.id}`}>
          Details
        </Link>
        <p className="rating">
          {movie.vote_average
            ? `${movie.vote_average.toFixed(1)} / 10`
            : "k.A."}
        </p>
      </div>
    </div>
  );
}
