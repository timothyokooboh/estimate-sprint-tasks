/*
  Warnings:

  - You are about to drop the column `name` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Task` table. All the data in the column will be lost.
  - Added the required column `isOwner` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "isOwner" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "name",
DROP COLUMN "ownerId",
ADD COLUMN     "title" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "name",
ADD COLUMN     "title" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "time" INTEGER NOT NULL;
