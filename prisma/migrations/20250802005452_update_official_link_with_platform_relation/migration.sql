/*
  Warnings:

  - You are about to drop the `OfficialChannel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostOfficialChannel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostOfficialChannel" DROP CONSTRAINT "PostOfficialChannel_officialChannelId_fkey";

-- DropForeignKey
ALTER TABLE "PostOfficialChannel" DROP CONSTRAINT "PostOfficialChannel_postId_fkey";

-- AlterTable
ALTER TABLE "PostVideo" ALTER COLUMN "linkVideo" DROP NOT NULL;

-- DropTable
DROP TABLE "OfficialChannel";

-- DropTable
DROP TABLE "PostOfficialChannel";

-- CreateTable
CREATE TABLE "official_links" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "postVideoId" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "official_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link_platforms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "link_platforms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "official_links_postVideoId_idx" ON "official_links"("postVideoId");

-- CreateIndex
CREATE INDEX "official_links_platformId_idx" ON "official_links"("platformId");

-- CreateIndex
CREATE UNIQUE INDEX "link_platforms_name_key" ON "link_platforms"("name");

-- AddForeignKey
ALTER TABLE "official_links" ADD CONSTRAINT "official_links_postVideoId_fkey" FOREIGN KEY ("postVideoId") REFERENCES "PostVideo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "official_links" ADD CONSTRAINT "official_links_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "link_platforms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
