import { checkIfUserExists, getAllUserBookmarks } from "@/utils/dbActions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import BookmarkedMovies from "../../_components/BookmarkedMovies";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const session = await getServerSession();

  if (session?.user?.email) {
    await checkIfUserExists(session.user.email);
  }

  if (!session?.user?.email) {
    return (
      <main className="about-page">
        <h2>Logge dich ein um deine Lesezeichen zu sehen!</h2>
      </main>
    );
  }

  let bookmarks = await getAllUserBookmarks(session.user.email);

  if (bookmarks.length === 0) {
    return (
      <main className="about-page">
        <h2>Du hast noch keine Lesezeichen gespeichert!</h2>
      </main>
    );
  }

  return (
    <main className="about-page">
      <BookmarkedMovies bookmarks={bookmarks} />
    </main>
  );
}
