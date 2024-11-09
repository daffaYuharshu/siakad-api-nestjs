import { z, ZodType } from 'zod';

export class QuestionnaireValidation {
  static readonly SUBMIT: ZodType = z.object({
    answers: z.array(
      z.object({
        student_id: z.number().int().positive(),
        notification_id: z.number().int().positive(),
        questionnaire_id: z.number().int().positive(),
        scale_value: z.number().int().min(1).max(5).positive(),
        submission_time: z.date(),
      }),
    ),
  });
}
