import { Movie } from "@/types/movie-type";
import axios from "redaxios";

const fetchMoviesData = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const fetchMovies = async (searchTerm: string) => {
  try {
    const showNowPlaying = searchTerm.length < 2;
    const { data } = await fetchMoviesData.get(
      `/${showNowPlaying ? "movie/now_playing" : "search/movie"}`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          query: showNowPlaying ? "" : searchTerm,
        },
      }
    );

    console.log("data", data);
    return data.results as Movie[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchMovies;
