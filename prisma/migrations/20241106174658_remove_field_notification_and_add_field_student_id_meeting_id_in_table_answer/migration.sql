/*
  Warnings:

  - You are about to drop the column `notification_id` on the `Answer` table. All the data in the column will be lost.
  - Added the required column `meeting_id` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_notification_id_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "notification_id",
ADD COLUMN     "meeting_id" INTEGER NOT NULL,
ADD COLUMN     "student_id" INTEGER NOT NULL;
