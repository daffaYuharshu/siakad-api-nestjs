import { Injectable, Inject, HttpException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { Logger } from 'winston';
import { QuestionnaireResponse } from '../model/questionnaire.model';

@Injectable()
export class QuestionnaireService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async get(notificationId: number): Promise<QuestionnaireResponse[]> {
    this.logger.info(
      `Get Questionnaires notification_id: ${JSON.stringify(notificationId)}`,
    );

    const attendance = await this.prismaService.attendance.findFirst({
      where: {
        notification_id: notificationId,
      },
    });

    if (!attendance) {
      throw new HttpException('Kuesioner tidak ditemukan', 404);
    }

    const questionnaires = await this.prismaService.questionnaire.findMany({
      where: {
        meeting_id: attendance.meeting_id,
      },
      include: {
        question: true,
      },
    });

    return questionnaires;
  }
}
