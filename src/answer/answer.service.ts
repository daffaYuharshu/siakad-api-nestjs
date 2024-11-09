import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { Logger } from 'winston';

@Injectable()
export class AnswerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async submit(
    notificationId: number,
    studentId: number,
    request,
  ): Promise<any> {
    this.logger.info(
      `Post Questionnaires notification_id: ${JSON.stringify(notificationId)} and student_id: ${JSON.stringify(studentId)}`,
    );
    console.log(request);
    const submitRequest = request.answers;
    return submitRequest;
  }
}
