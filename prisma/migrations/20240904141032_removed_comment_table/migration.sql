/*
  Warnings:

  - The primary key for the `BookmarkedMovie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BookmarkedMovie` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "BookmarkedMovie_movieID_userEmail_key";

-- AlterTable
ALTER TABLE "BookmarkedMovie" DROP CONSTRAINT "BookmarkedMovie_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "BookmarkedMovie_pkey" PRIMARY KEY ("movieID");

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "rated" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER,
    "userEmail" TEXT NOT NULL,
    "movieID" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookmarkedMovie" ADD CONSTRAINT "BookmarkedMovie_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
