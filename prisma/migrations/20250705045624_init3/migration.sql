/*
  Warnings:

  - You are about to drop the `_GenreToPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostToStudio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GenreToPost" DROP CONSTRAINT "_GenreToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToPost" DROP CONSTRAINT "_GenreToPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_PostToStudio" DROP CONSTRAINT "_PostToStudio_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToStudio" DROP CONSTRAINT "_PostToStudio_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "genre" TEXT[],
ADD COLUMN     "studio" TEXT[];

-- DropTable
DROP TABLE "_GenreToPost";

-- DropTable
DROP TABLE "_PostToStudio";
