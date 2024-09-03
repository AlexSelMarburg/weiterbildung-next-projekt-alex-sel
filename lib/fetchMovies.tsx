import { Movie } from "@/types/movie-type";
import axios from "redaxios";

const fetchMoviesData = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchMovies = async (searchTerm: string, page = 1) => {
  try {
    const showNowPlaying = searchTerm.length < 2;
    const { data } = await fetchMoviesData.get(
      `/${showNowPlaying ? "movie/now_playing" : "search/movie"}`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          query: showNowPlaying ? "" : searchTerm,
          language: "de-DE",
          page: page,
        },
      }
    );

    return data.results as Movie[];
  } catch (error) {
    console.error(error);
    return [];
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

  console.log("VIDEOS::::", data.results);

  return data.results || [];
}
