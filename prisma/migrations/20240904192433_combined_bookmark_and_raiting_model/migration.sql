/*
  Warnings:

  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userEmail_fkey";

-- AlterTable
ALTER TABLE "BookmarkedMovie" ADD COLUMN     "raited" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "raiting" INTEGER;

-- DropTable
DROP TABLE "Rating";
