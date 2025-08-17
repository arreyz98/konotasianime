-- CreateEnum
CREATE TYPE "VideoType" AS ENUM ('EPISODE', 'TRAILER', 'PV', 'MV', 'RECAP', 'OTHER');

-- AlterTable
ALTER TABLE "PostVideo" ADD COLUMN     "type" "VideoType" NOT NULL DEFAULT 'EPISODE',
ALTER COLUMN "episode" SET DATA TYPE TEXT;
