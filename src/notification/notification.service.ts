import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { Logger } from 'winston';
import { NotificationResponse } from '../model/notification.model';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async get(studentId: number): Promise<NotificationResponse[]> {
    this.logger.info(
      `Get Notifications student_id: ${JSON.stringify(studentId)}`,
    );
    const notifications = await this.prismaService.notification.findMany({
      where: {
        attendance: {
          student_id: studentId,
        },
      },
      include: {
        attendance: true,
      },
    });

    if (notifications.length != 0) {
      await Promise.all(
        notifications.map(async (notification) => {
          if (notification.is_read != true) {
            await this.prismaService.notification.update({
              where: {
                id: notification.id,
              },
              data: {
                is_read: true,
              },
            });
          }
        }),
      );
    }

    return notifications.map((notification) =>
      this.toNotificationResponse(notification),
    );
  }

  toNotificationResponse(notification: any): NotificationResponse {
    return {
      id: notification.id,
      sent_time: notification.sent_time,
      attendance: {
        id: notification.attendance.id,
        meeting_id: notification.attendance.meeting_id,
      },
    };
  }
}
