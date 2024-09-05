import { useState } from "react";
import Star from "@/src/app/_components/Star";

export default function StarRating({
  maxRating = 10,
  messages = [],
  defaultRating = 0,
  onSetRating = (raiting: number) => {},
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating: number) {
    setRating(rating);
    onSetRating?.(rating);
  }

  return (
    <div className="star-rating">
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
          : tempRating || rating || "KA"}
      </p>
    </div>
  );
}
