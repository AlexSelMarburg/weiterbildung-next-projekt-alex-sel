"use client";

import type { BookmarkedMovie } from "@/types/movie-type";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import BookmarkedMovieCard from "./BookmarkedMovieCard";
import CustomCheckbox from "./CustomCheckbox";

export const revalidate = 0;

export default function BookmarkedMovies({
  bookmarks,
}: {
  bookmarks: BookmarkedMovie[];
}) {
  const [bookmark, setBookmark] = useState(0);
  const [showRated, setShowRated] = useState(true);

  const filteredBookmarks = showRated
    ? bookmarks.filter((bookmark) => !bookmark?.rated)
    : bookmarks;

  function handleLeftClick() {
    if (bookmark > 0) {
      setBookmark(bookmark - 1);
    }
  }

  function handleRightClick() {
    if (bookmark < filteredBookmarks.length - 1) {
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
          {filteredBookmarks.length > 0 ? bookmark + 1 : 0} von{" "}
          {filteredBookmarks.length}
        </span>
        <button
          className="right"
          disabled={
            bookmark === filteredBookmarks.length - 1 ||
            filteredBookmarks.length === 0
          }
          onClick={handleRightClick}
        >
          <MdKeyboardArrowRight />
        </button>

        <div className="checkbox-container">
          <CustomCheckbox
            checked={!showRated}
            onChecked={() => {
              setBookmark(0);
              setShowRated(!showRated);
            }}
          />
          <span>rated</span>
        </div>
      </div>
      <div className="bookmarked-movie">
        {filteredBookmarks.length ? (
          <BookmarkedMovieCard bookmark={filteredBookmarks[bookmark]} />
        ) : (
          <h4>Keine Lesezeichen gefunden</h4>
        )}
      </div>
    </div>
  );
}
