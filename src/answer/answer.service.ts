import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { Logger } from 'winston';
import { AttendanceResponse } from '../model/attendance.model';
import { SubmitAnswerRequest } from '../model/answer.model';
import { ValidationService } from '../common/validation.service';
import { AnswerValidation } from './answer.validation';

@Injectable()
export class AnswerService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async submit(
    notificationId: number,
    studentId: number,
    request: SubmitAnswerRequest,
  ): Promise<AttendanceResponse> {
    this.logger.info(`Submit new answers ${JSON.stringify(request)}`);

    const submitRequest: SubmitAnswerRequest = this.validationService.validate(
      AnswerValidation.SUBMIT,
      request,
    );

    await Promise.all(
      submitRequest.answers.map(async (request) => {
        await this.prismaService.answer.create({
          data: {
            ...request,
            student_id: studentId,
          },
        });
      }),
    );

    await this.prismaService.attendance.update({
      where: {
        notification_id: notificationId,
      },
      data: {
        notification_id: null,
      },
    });

    await this.prismaService.notification.delete({
      where: {
        id: notificationId,
      },
    });

    return {
      message: 'Berhasil menyimpan jawaban',
    };
  }
}
