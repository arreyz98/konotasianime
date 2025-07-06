/*
  Warnings:

  - You are about to drop the `Source` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostToSource` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PostToSource" DROP CONSTRAINT "_PostToSource_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToSource" DROP CONSTRAINT "_PostToSource_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "source" TEXT[];

-- DropTable
DROP TABLE "Source";

-- DropTable
DROP TABLE "_PostToSource";
