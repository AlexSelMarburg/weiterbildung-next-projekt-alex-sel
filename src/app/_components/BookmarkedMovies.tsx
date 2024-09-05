"use client";

import type { BookmarkedMovie } from "@/types/movie-type";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import BookmarkedMovieCard from "./BookmarkedMovieCard";

export default function BookmarkedMovies({
  bookmarks,
}: {
  bookmarks: BookmarkedMovie[];
}) {
  const [bookmark, setBookmark] = useState(0);

  function handleLeftClick() {
    if (bookmark > 0) {
      setBookmark(bookmark - 1);
    }
  }

  function handleRightClick() {
    if (bookmark < bookmarks.length - 1) {
      setBookmark(bookmark + 1);
    }
  }

  return (
    <div id="bookmarked-movies">
      <div className="pagination">
        <button
          className="left"
          disabled={bookmark === 0}
          onClick={handleLeftClick}
        >
          <MdKeyboardArrowLeft />
        </button>
        <span className="movies-count">
          {bookmark + 1} von {bookmarks.length}
        </span>
        <button
          className="right"
          disabled={bookmark === bookmarks.length - 1}
          onClick={handleRightClick}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
      <div className="bookmarked-movie-container">
        <BookmarkedMovieCard bookmark={bookmarks[bookmark]} />
      </div>
    </div>
  );
}
