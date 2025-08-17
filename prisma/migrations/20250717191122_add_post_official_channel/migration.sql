-- CreateTable
CREATE TABLE "PostOfficialChannel" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "postId" TEXT NOT NULL,
    "officialChannelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostOfficialChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfficialChannel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfficialChannel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OfficialChannel_name_key" ON "OfficialChannel"("name");

-- AddForeignKey
ALTER TABLE "PostOfficialChannel" ADD CONSTRAINT "PostOfficialChannel_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostOfficialChannel" ADD CONSTRAINT "PostOfficialChannel_officialChannelId_fkey" FOREIGN KEY ("officialChannelId") REFERENCES "OfficialChannel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
