import { z, ZodType } from 'zod';

export class AttendanceValidation {
  static readonly SUBMIT: ZodType = z.object({
    attendances: z.array(
      z.object({
        student_id: z.number().int().positive(),
        meeting_id: z.number().int().positive(),
        status: z.string().min(1),
        time: z.date(),
      }),
    ),
  });
}
