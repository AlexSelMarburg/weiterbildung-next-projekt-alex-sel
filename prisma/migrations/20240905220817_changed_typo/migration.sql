/*
  Warnings:

  - You are about to drop the column `raited` on the `BookmarkedMovie` table. All the data in the column will be lost.
  - You are about to drop the column `raiting` on the `BookmarkedMovie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookmarkedMovie" DROP COLUMN "raited",
DROP COLUMN "raiting",
ADD COLUMN     "rated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rating" INTEGER;
