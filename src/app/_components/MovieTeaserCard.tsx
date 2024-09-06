import { shortenString } from "@/lib/helpers";
import { Movie } from "@/types/movie-type";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBookmark } from "react-icons/fa6";

type Props = {
  movie: Movie;
  isBookmarked: boolean;
};

const variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};
export default function MovieTeaserCard({ movie, isBookmarked }: Props) {
  const hasPosterPoster = movie.poster_path !== null;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.75, ease: "easeInOut", duration: 0.45 }}
      viewport={{ amount: 0 }}
      className={`movie-teaser-card ${!hasPosterPoster ? "has-no-poster" : ""}`}
    >
      {isBookmarked && <FaBookmark className="bookmark-icon" />}
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
    </motion.div>
  );
}
