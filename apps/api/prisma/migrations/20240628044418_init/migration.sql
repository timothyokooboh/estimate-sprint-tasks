/*
  Warnings:

  - A unique constraint covering the columns `[participantId,taskId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" VARCHAR(500) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_participantId_taskId_key" ON "Vote"("participantId", "taskId");
