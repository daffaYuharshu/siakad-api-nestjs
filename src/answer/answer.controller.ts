import { Controller, Param, Body, ParseIntPipe, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { WebResponse } from 'src/model/web.model';
import { AnswerResponse } from 'src/model/answer.model';

@Controller(
  '/students/:studentId/notifications/:notificationId/questionnaires/answers',
)
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Post()
  async submit(
    @Param('notificationId', ParseIntPipe) notificationId: number,
    @Param('studentId', ParseIntPipe) studentId: number,
    @Body() request,
  ): Promise<WebResponse<AnswerResponse>> {
    const result = await this.answerService.submit(
      notificationId,
      studentId,
      request,
    );

    return {
      data: result,
    };
  }
}
