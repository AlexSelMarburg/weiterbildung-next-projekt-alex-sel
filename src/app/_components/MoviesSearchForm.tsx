"use client";

import { FaMagnifyingGlass } from "react-icons/fa6";

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export default function MoviesSearchForm({ searchTerm, setSearchTerm }: Props) {
  return (
    <div className="movies-search">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filme suchen..."
        />
      </form>
    </div>
  );
}
