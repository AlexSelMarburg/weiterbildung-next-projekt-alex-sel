export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type VideoData = {
  site: string;
  key: string;
  official: boolean;
  type: string;
};

export type DetailedMovie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  genres: [{ name: string }];
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  vote_count: number;
};

export type BookmarkedMovie = {
  movieID: number;
  userEmail: string;
  rating: number | null;
  rated: boolean;
};
