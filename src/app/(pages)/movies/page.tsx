import { Metadata } from "next";
import Movies from "../../_components/Movies";
import { getServerSession } from "next-auth";
import { checkIfUserExists, getAllUserBookmarks } from "@/utils/dbActions";
import { BookmarkedMovie } from "@prisma/client";

export const metadata: Metadata = {
  title: "Filme",
};

export default async function MoviesPage() {
  const session = await getServerSession();

  if (session?.user?.email) {
    await checkIfUserExists(session.user.email);
  }

  let bookmarks: BookmarkedMovie[] = [];
  if (session?.user?.email) {
    bookmarks = await getAllUserBookmarks(session.user.email);
  }

  return (
    <main className="movies-page">
      <Movies bookmarks={bookmarks} />
    </main>
  );
}

// function getRaitedUnraitedMovies(bookmarks: BookmarkedMovie[]) {
//   const raitedBookmarks: BookmarkedMovie[] = [];
//   const unraitedBookmarks: BookmarkedMovie[] = [];

//   const sortedBookmarks = bookmarks.forEach((bookmark) => {
//     if (bookmark.raited) {
//       raitedBookmarks.push(bookmark);
//     } else {
//       unraitedBookmarks.push(bookmark);
//     }
//   });
//   return [raitedBookmarks, unraitedBookmarks];
// }
