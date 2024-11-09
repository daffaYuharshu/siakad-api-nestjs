import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireResponse } from '../model/questionnaire.model';
import { WebResponse } from '../model/web.model';

@Controller('/students/:studentId/notifications/:notificationId/questionnaires')
export class QuestionnaireController {
  constructor(private questionnaireService: QuestionnaireService) {}

  @Get()
  async get(
    @Param('notificationId', ParseIntPipe) notificationId: number,
  ): Promise<WebResponse<QuestionnaireResponse[]>> {
    const result = await this.questionnaireService.get(notificationId);
    return {
      data: result,
    };
  }
}
