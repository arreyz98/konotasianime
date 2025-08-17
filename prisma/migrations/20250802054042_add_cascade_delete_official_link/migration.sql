-- DropForeignKey
ALTER TABLE "official_links" DROP CONSTRAINT "official_links_postVideoId_fkey";

-- AlterTable
ALTER TABLE "official_links" ADD COLUMN     "access" TEXT NOT NULL DEFAULT 'Gratis';

-- AddForeignKey
ALTER TABLE "official_links" ADD CONSTRAINT "official_links_postVideoId_fkey" FOREIGN KEY ("postVideoId") REFERENCES "PostVideo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
