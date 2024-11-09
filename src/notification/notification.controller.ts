import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { WebResponse } from '../model/web.model';
import { NotificationResponse } from '../model/notification.model';

@Controller('/students/:studentId/notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  async get(
    @Param('studentId', ParseIntPipe) studentId: number,
  ): Promise<WebResponse<NotificationResponse[]>> {
    const result = await this.notificationService.get(studentId);
    return {
      data: result,
    };
  }
}
