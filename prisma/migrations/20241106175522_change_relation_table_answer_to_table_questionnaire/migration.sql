/*
  Warnings:

  - You are about to drop the column `meeting_id` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `question_id` on the `Answer` table. All the data in the column will be lost.
  - Added the required column `questionnaire_id` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_question_id_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "meeting_id",
DROP COLUMN "question_id",
ADD COLUMN     "questionnaire_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionnaire_id_fkey" FOREIGN KEY ("questionnaire_id") REFERENCES "Questionnaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
