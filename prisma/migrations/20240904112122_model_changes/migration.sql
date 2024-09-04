/*
  Warnings:

  - You are about to drop the `_BookmarkedMovieToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userEmail` to the `BookmarkedMovie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookmarkedMovieToUser" DROP CONSTRAINT "_BookmarkedMovieToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookmarkedMovieToUser" DROP CONSTRAINT "_BookmarkedMovieToUser_B_fkey";

-- AlterTable
ALTER TABLE "BookmarkedMovie" ADD COLUMN     "userEmail" TEXT NOT NULL;

-- DropTable
DROP TABLE "_BookmarkedMovieToUser";
