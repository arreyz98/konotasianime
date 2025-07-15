/*
  Warnings:

  - You are about to drop the column `isFeaturd` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "isFeaturd",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;
