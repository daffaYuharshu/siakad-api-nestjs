import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AttendanceModule } from './attendance/attendance.module';
import { NotificationModule } from './notification/notification.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    CommonModule,
    AttendanceModule,
    NotificationModule,
    QuestionnaireModule,
    AnswerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
