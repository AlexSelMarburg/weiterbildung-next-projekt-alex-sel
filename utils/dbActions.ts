"use server";

import type { User } from "@prisma/client";
import prisma from "../prisma/db";
import { revalidatePath } from "next/cache";

export const findUser = async (email: string) => {
  const user: User | null = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const createUser = async (email: string) => {
  await prisma.user.create({
    data: {
      email,
    },
  });
};

export async function checkIfUserExists(email: string) {
  const user = await findUser(email);
  if (user) return;
  await createUser(email);
}

export async function createBookmark(userEmail: string, movieID: number) {
  await prisma.bookmarkedMovie.create({
    data: {
      userEmail,
      movieID,
    },
  });
}

export async function deleteBookmark(userEmail: string, movieID: number) {
  await prisma.bookmarkedMovie.deleteMany({
    where: {
      userEmail,
      movieID,
    },
  });
}

export async function isBookmarkedMovie(userEmail: string, movieID: number) {
  const bookmark = await prisma.bookmarkedMovie.findFirst({
    where: {
      userEmail,
      movieID,
    },
  });
  if (bookmark) return true;
  return false;
}

export async function toggleBookmark(userEmail: string, movieID: number) {
  const isBookmarked = await isBookmarkedMovie(userEmail, movieID);

  if (isBookmarked) {
    await deleteBookmark(userEmail, movieID);
  } else {
    await createBookmark(userEmail, movieID);
  }

  return isBookmarked;
}

export async function formToggleBookmark(
  prevState: unknown,
  formData: FormData
) {
  try {
    const movieID = Number(formData.get("movieID"));
    const userEmail = String(formData.get("userEmail"));

    const isBookmarked = await toggleBookmark(userEmail, movieID);
    revalidatePath(`/movies/${movieID}`);
    return {
      message: isBookmarked
        ? "Lesezeichen entfernt!"
        : "Lesezeichen hinzugefügt	",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { message: "Ein Fehler ist aufgetreten!", status: 500 };
  }
}

export async function getAllUserBookmarks(userEmail: string) {
  const bookmarks = await prisma.bookmarkedMovie.findMany({
    where: {
      userEmail,
    },
    orderBy: {
      movieID: "desc",
    },
  });

  return bookmarks;
}

export async function setBookmarkRating(
  userEmail: string,
  movieID: number,
  rating: number
) {
  await prisma.bookmarkedMovie.updateMany({
    where: {
      userEmail,
      movieID,
    },
    data: {
      rating,
      rated: true,
    },
  });
}

export async function setFormBookmarkRating(
  prevState: unknown,
  formData: FormData
) {
  try {
    const userEmail = String(formData.get("userEmail"));
    const movieID = Number(formData.get("movieID"));
    const rating = Number(formData.get("rating"));
    const title = String(formData.get("title"));
    await setBookmarkRating(userEmail, movieID, rating);

    revalidatePath(`/bookmarks`);
    return {
      message: `Bewertung ${rating} für ${title} gespeichert`,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { message: "Ein Fehler ist aufgetreten!", status: 500 };
  }
}

export async function getBookmarkRating(userEmail: string, movieID: number) {
  const bookmark = await prisma.bookmarkedMovie.findFirst({
    where: {
      userEmail,
      movieID,
    },
  });
  return bookmark?.rating;
}
