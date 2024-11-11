import { Controller, Param, Body, ParseIntPipe, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { WebResponse } from '../model/web.model';
import { AnswerResponse, SubmitAnswerRequest } from '../model/answer.model';

@Controller(
  '/students/:studentId/notifications/:notificationId/questionnaires/answers',
)
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Post()
  async submit(
    @Param('notificationId', ParseIntPipe) notificationId: number,
    @Param('studentId', ParseIntPipe) studentId: number,
    @Body() request: SubmitAnswerRequest,
  ): Promise<WebResponse<AnswerResponse>> {
    request.answers.map((answer) => {
      answer.submission_time = new Date();
    });

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
