-- CreateEnum
CREATE TYPE "ESTIMATION_MODE" AS ENUM ('TIME_ESTIMATES', 'STORY_POINTS');

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "estimationMode" "ESTIMATION_MODE" NOT NULL DEFAULT 'TIME_ESTIMATES';
