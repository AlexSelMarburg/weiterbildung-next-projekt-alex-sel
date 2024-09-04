/*
  Warnings:

  - You are about to drop the `BookmarkedMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookmarkedMovie" DROP CONSTRAINT "BookmarkedMovie_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userEmail_fkey";

-- DropTable
DROP TABLE "BookmarkedMovie";

-- DropTable
DROP TABLE "Rating";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "email" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "bookmarkedMovie" (
    "movieID" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "bookmarkedMovie_pkey" PRIMARY KEY ("movieID","userEmail")
);

-- CreateTable
CREATE TABLE "rating" (
    "id" TEXT NOT NULL,
    "rated" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER,
    "userEmail" TEXT NOT NULL,
    "movieID" INTEGER NOT NULL,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "bookmarkedMovie" ADD CONSTRAINT "bookmarkedMovie_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
