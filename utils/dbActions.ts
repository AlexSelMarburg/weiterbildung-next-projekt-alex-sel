"use server";

import { User } from "@prisma/client";
import prisma from "../prisma/db";

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
