"use server";

import { User } from "@prisma/client";
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

// export async function deleteBookmark(userEmail: string, movieID: number) {
//   await prisma.bookmarkedMovie.delete({
//     where: {
//       userEmail,
//       movieID,
//     },
//   });
// }

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
  await new Promise((resolve) => setTimeout(resolve, 1000));

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
