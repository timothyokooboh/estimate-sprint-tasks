/*
  Warnings:

  - Changed the type of `value` on the `Vote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "value",
ADD COLUMN     "value" INTEGER NOT NULL;
