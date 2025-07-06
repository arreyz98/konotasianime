/*
  Warnings:

  - Added the required column `linkVideo` to the `PostVideo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostVideo" ADD COLUMN     "linkVideo" TEXT NOT NULL;
