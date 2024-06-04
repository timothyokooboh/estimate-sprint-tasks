/*
  Warnings:

  - You are about to drop the column `isOwner` on the `Participant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "isOwner",
ADD COLUMN     "isModerator" BOOLEAN NOT NULL DEFAULT false;
