-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_favoritedById_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "averageRating" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_favoritedById_fkey" FOREIGN KEY ("favoritedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
