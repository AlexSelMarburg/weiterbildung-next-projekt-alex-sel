"use server";
import { Movie } from "@/types/movie-type";
import axios from "redaxios";

const fetchMoviesData = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchMovies = async (searchTerm = "", page = 1) => {
  try {
    const showNowPlaying = searchTerm.length < 2;
    const { data } = await fetchMoviesData.get(
      `/${showNowPlaying ? "movie/now_playing" : "search/movie"}`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          query: showNowPlaying ? "" : searchTerm,
          // language: "de-DE",
          page: page,
        },
      }
    );

    return {
      movies: data.results as Movie[],
      pages: data.total_pages as number,
    };
  } catch (error) {
    console.error(error);
    return { movies: [], pages: 0 };
  }
};

export async function fetchMovie(id: string) {
  const { data } = await fetchMoviesData.get(`movie/${id}`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
      language: "de-DE",
    },
  });

  return data;
}

export async function fetchMovieVideos(id: string) {
  const { data } = await fetchMoviesData.get(`movie/${id}/videos`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
      // language: "de-DE",
    },
  });

  return data.results || [];
}
