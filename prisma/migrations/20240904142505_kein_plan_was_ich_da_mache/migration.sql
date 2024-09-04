/*
  Warnings:

  - The primary key for the `BookmarkedMovie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BookmarkedMovie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookmarkedMovie" DROP CONSTRAINT "BookmarkedMovie_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "BookmarkedMovie_pkey" PRIMARY KEY ("movieID", "userEmail");
