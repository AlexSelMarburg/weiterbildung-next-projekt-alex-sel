"use client";

import type { BookmarkedMovie, DetailedMovie } from "@/types/movie-type";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { fetchMovie } from "../(pages)/movies/action";
import BookmarkedMovieCard from "./BookmarkedMovieCard";

export const revalidate = 0;

export default function BookmarkedMovies({
  bookmarks,
}: {
  bookmarks: BookmarkedMovie[];
}) {
  const [bookmark, setBookmark] = useState(0);
  const [movie, setMovie] = useState(null);
  console.log(bookmarks);

  useEffect(() => {
    async function fetchBookmarkedMovie(id: string) {
      try {
        const movie: DetailedMovie = await fetchMovie(id);
        console.dir("movie", movie);

        // setMovie(movie);
      } catch (error) {}
    }

    fetchBookmarkedMovie(bookmarks[bookmark].movieID + "");
  }, [bookmarks, bookmark]);

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
      <div className="bookmarked-movie">
        <BookmarkedMovieCard bookmark={bookmarks[bookmark]} />
      </div>
    </div>
  );
}
