-- CreateEnum
CREATE TYPE "PARTICIPANT_STATUS" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "SESSION_STATUS" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "status" "PARTICIPANT_STATUS" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "status" "SESSION_STATUS" NOT NULL DEFAULT 'ACTIVE';
