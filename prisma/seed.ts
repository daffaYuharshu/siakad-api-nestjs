import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

async function main(): Promise<void> {
  await prismaClient.question.deleteMany();
  await prismaClient.questionnaire.deleteMany();

  const questionSeeds = [
    {
      text: 'Seberapa baik media pembelajaran yang digunakan dalam pertemuan ini (misalnya slide, video, alat peraga)?',
    },
    {
      text: 'Seberapa nyaman Anda untuk bertanya atau berinteraksi selama pertemuan ini?',
    },
    {
      text: 'Seberapa baik alur penyampaian materi dalam pertemuan ini?',
    },
    {
      text: 'Seberapa efektif waktu yang digunakan dalam pertemuan ini untuk membahas semua topik yang direncanakan?',
    },
    {
      text: 'Seberapa besar motivasi Anda untuk belajar lebih lanjut tentang topik yang dibahas dalam pertemuan ini?',
    },
  ];

  await Promise.all(
    questionSeeds.map(async (question) => {
      await prismaClient.question.create({
        data: question,
      });
    }),
  );

  const questions = await prismaClient.question.findMany();

  await Promise.all(
    questions.map(async (question) => {
      await prismaClient.questionnaire.create({
        data: {
          meeting_id: 1,
          question_id: question.id,
        },
      });
    }),
  );

  console.log('Success create data');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
