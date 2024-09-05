// import { useState } from "react";
// import Star from "@/src/app/_components/Star";
// import { BookmarkedMovie } from "@/types/movie-type";

// type Props = {
//   bookmark: BookmarkedMovie;
//   maxRating?: number;
//   messages?: string[];
//   defaultRating?: number;
// };

// export default function StarRating({
//   maxRating = 10,
//   messages = [],
//   defaultRating = 0,
//   bookmark,
// }: Props) {
//   const [rating, setRating] = useState(defaultRating);
//   const [tempRating, setTempRating] = useState(bookmark.raiting || 0);

//   console.log("bookmark from star-rating", bookmark);

//   function handleRating(rating: number) {
//     setRating(rating);
//     // onSetRating?.(rating);
//   }

//   return (
//     <form
//       className="star-rating"
//       onSubmit={(e) => e.preventDefault()}
//       // action={}
//     >
//       <input type="hidden" name="rating" value={rating} />
//       <div className="star-container">
//         {Array.from({ length: maxRating }, (_, i) => (
//           <Star
//             key={i}
//             // onRate={() => handleRating(i + 1)}
//             full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
//             onHoverIn={() => setTempRating(i + 1)}
//             onLeave={() => setTempRating(0)}
//           />
//         ))}
//       </div>
//       <p className="star-rating-text">
//         {messages.length === maxRating
//           ? messages[tempRating ? tempRating - 1 : rating - 1]
//           : tempRating || rating || ""}
//       </p>
//     </form>
//   );
// }

import { useEffect, useRef, useState } from "react";
import Star from "@/src/app/_components/Star";
import { BookmarkedMovie } from "@/types/movie-type";
import { useFormState } from "react-dom";
import { setFormBookmarkRaiting } from "@/utils/dbActions";
import toast from "react-hot-toast";

type Props = {
  bookmark: BookmarkedMovie;
  maxRating?: number;
  messages?: string[];
  defaultRating?: number;
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
}: Props) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(bookmark.raiting || 0);
  const [state, formAction] = useFormState(
    setFormBookmarkRaiting,
    initialState
  );
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

  console.log("bookmark from star-rating", bookmark);

  function handleRating(rating: number) {
    setRating(rating);
    // onSetRating?.(rating);
  }

  return (
    <form
      className="star-rating"
      // onSubmit={(e) => e.preventDefault()}
      action={formAction}
      ref={formRef}
    >
      <input type="hidden" name="rating" value={rating} />
      <input type="hidden" name="userEmail" value={bookmark.userEmail} />
      <input type="hidden" name="movieID" value={bookmark.movieID} />

      <div className="star-container">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
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
