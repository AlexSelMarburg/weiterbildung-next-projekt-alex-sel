import { Metadata } from "next";
import Movies from "../../_components/Movies";

export const metadata: Metadata = {
  title: "Filme",
};

export default function MoviesPage() {
  return (
    <main className="movies-page">
      <Movies />
    </main>
  );
}
