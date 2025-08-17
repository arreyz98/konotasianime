/*
  Warnings:

  - Changed the type of `episode` on the `PostVideo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PostVideo" DROP COLUMN "episode",
ADD COLUMN     "episode" INTEGER NOT NULL;
