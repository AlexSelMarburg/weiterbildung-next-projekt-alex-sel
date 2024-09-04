/*
  Warnings:

  - You are about to drop the `bookmarkedMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookmarkedMovie" DROP CONSTRAINT "bookmarkedMovie_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_userEmail_fkey";

-- DropTable
DROP TABLE "bookmarkedMovie";

-- DropTable
DROP TABLE "rating";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "BookmarkedMovie" (
    "movieID" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "BookmarkedMovie_pkey" PRIMARY KEY ("movieID","userEmail")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "rated" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER,
    "userEmail" TEXT NOT NULL,
    "movieID" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "BookmarkedMovie" ADD CONSTRAINT "BookmarkedMovie_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
