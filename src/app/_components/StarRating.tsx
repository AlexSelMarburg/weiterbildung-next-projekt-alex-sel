import { useEffect, useRef, useState } from "react";
import Star from "@/src/app/_components/Star";
import { BookmarkedMovie, DetailedMovie } from "@/types/movie-type";
import { useFormState } from "react-dom";
import { setFormBookmarkRating } from "@/utils/dbActions";
import toast from "react-hot-toast";

export const revalidate = 0;

type Props = {
  bookmark: BookmarkedMovie;
  maxRating?: number;
  messages?: string[];
  defaultRating?: number;
  movie: DetailedMovie;
};

const initialState = {
  message: "",
  status: 0,
};

export default function StarRating({
  maxRating = 10,
  messages = [],
  defaultRating = 0,
  bookmark,
  movie,
}: Props) {
  const [rating, setRating] = useState(bookmark?.rating || defaultRating);
  const [tempRating, setTempRating] = useState(defaultRating);
  const [state, formAction] = useFormState(setFormBookmarkRating, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 200) {
      toast.success(state.message);
      formRef.current?.reset();
    }

    if (state.status === 500) {
      toast.error(state.message);
    }
  }, [state.status, state.message]);

  const curRating = bookmark?.rating || 0;
  useEffect(() => {
    setRating(bookmark?.rating || 0);
  }, [curRating, bookmark?.rating, state.status, state.message]);

  return (
    <form className="star-rating" action={formAction} ref={formRef}>
      <input type="hidden" name="rating" value={rating} />
      <input type="hidden" name="userEmail" value={bookmark?.userEmail} />
      <input type="hidden" name="movieID" value={bookmark?.movieID} />
      <input type="hidden" name="title" value={movie?.title} />

      <div className="star-container">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => setRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onLeave={() => setTempRating(0)}
          />
        ))}
      </div>
      <p className="star-rating-text">
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </form>
  );
}
