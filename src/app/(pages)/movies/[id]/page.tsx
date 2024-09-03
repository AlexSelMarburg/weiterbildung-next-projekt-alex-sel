import { fetchMovie, fetchMovieVideos } from "@/src/app/(pages)/movies/action";
import MovieTrailerIFrame from "@/src/app/_components/MovieTrailerIFrame";
import { DetailedMovie, VideoData } from "@/types/movie-type";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default async function MovieDetails({ params: { id } }: Props) {
  const movie: DetailedMovie = await fetchMovie(id);

  const genres = movie.genres
    .map((genre: { name: string }) => genre.name)
    .join(", ");

  let videos: VideoData[] = await fetchMovieVideos(id);
  videos = videos
    .filter(
      (video) =>
        video.site === "YouTube" && video.official && video.type !== "Bloopers"
    )
    ?.splice(0, 4);

  return (
    <div className="movie-details-page">
      <div className="movie-details">
        <div className="left-container">
          <div
            className={`poster-container ${movie.poster_path ? "" : "empty"}`}
          >
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="test"
                fill
                sizes="(100vw - 2rem) 100vh"
                quality={30}
              />
            )}

            {!movie.poster_path && <p>Kein Poster vorhanden</p>}
          </div>
        </div>
        <div className="right-container">
          <h3>{movie.title}</h3>
          {movie.title !== movie.original_title && (
            <h4>{movie.original_title}</h4>
          )}

          {movie.overview ? <p>{movie.overview}</p> : <p>Keine Beschreibung</p>}

          <div className="info-container">
            {genres && (
              <p>
                <span className="highlight">Genres:</span> {genres}
              </p>
            )}

            <p>
              <span className="highlight">Erscheinungsdatum:</span>{" "}
              {new Date(movie.release_date).toLocaleDateString("de-DE")}
            </p>

            <p>
              <span className="highlight">Laufzeit:</span> {movie.runtime} min
            </p>

            <p>
              <span className="highlight">Bewertung:</span>{" "}
              {movie.vote_average.toFixed(1)} / 10
            </p>
          </div>

          <Link className="link-btn" href={`/movies`}>
            Zurück zu der Filmsuche
          </Link>
        </div>
      </div>
      {videos.length > 0 && (
        <div className="trailers">
          <h4>Trailer</h4>
          <div className="videos-container">
            {videos.map((video: VideoData) => (
              <MovieTrailerIFrame key={video.key} video={video} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const { title, original_title } = await fetchMovie(id);

  return {
    title: title || original_title,
  };
}
