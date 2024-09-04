/*
  Warnings:

  - The primary key for the `BookmarkedMovie` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "BookmarkedMovie" DROP CONSTRAINT "BookmarkedMovie_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BookmarkedMovie_pkey" PRIMARY KEY ("id");
