"use client";

import type { BookmarkedMovie, DetailedMovie } from "@/types/movie-type";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import BookmarkedMovieCard from "./BookmarkedMovieCard";

export const revalidate = 0;

export default function BookmarkedMovies({
  bookmarks,
}: {
  bookmarks: BookmarkedMovie[];
}) {
  const [bookmark, setBookmark] = useState(0);
  const [showRated, setShowRated] = useState(true);

  const unratedBookmarks = bookmarks.filter((bookmark) => !bookmark.raited);

  function handleLeftClick() {
    if (bookmark > 0) {
      setBookmark(bookmark - 1);
    }
  }

  console.log("showRated: ", showRated);

  function handleRightClick() {
    if (
      showRated
        ? bookmark < unratedBookmarks.length - 1
        : bookmark < bookmarks.length - 1
    ) {
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
          {showRated ? bookmark + 1 : bookmark + 1} von{" "}
          {showRated ? unratedBookmarks.length : bookmarks.length}
        </span>
        <button
          className="right"
          disabled={bookmark === bookmarks.length - 1}
          onClick={handleRightClick}
        >
          <MdKeyboardArrowRight />
        </button>

        <div>
          <input
            type="checkbox"
            checked={showRated}
            onChange={() => {
              setBookmark(0);
              setShowRated(!showRated);
            }}
          />{" "}
          rated
        </div>
      </div>
      <div className="bookmarked-movie">
        <BookmarkedMovieCard
          bookmark={
            showRated ? unratedBookmarks[bookmark] : bookmarks[bookmark]
          }
        />
      </div>
    </div>
  );
}
