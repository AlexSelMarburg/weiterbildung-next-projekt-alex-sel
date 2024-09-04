/*
  Warnings:

  - The primary key for the `BookmarkedMovie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[movieID,userEmail]` on the table `BookmarkedMovie` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `BookmarkedMovie` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userEmail_fkey";

-- AlterTable
ALTER TABLE "BookmarkedMovie" DROP CONSTRAINT "BookmarkedMovie_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "BookmarkedMovie_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Rating";

-- CreateIndex
CREATE UNIQUE INDEX "BookmarkedMovie_movieID_userEmail_key" ON "BookmarkedMovie"("movieID", "userEmail");
