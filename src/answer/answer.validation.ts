import { z, ZodType } from 'zod';

export class AnswerValidation {
  static readonly SUBMIT: ZodType = z.object({
    answers: z.array(
      z.object({
        questionnaire_id: z.number().int().positive(),
        scale_value: z.number().int().min(1).max(5).positive(),
        submission_time: z.date(),
      }),
    ),
  });
}
