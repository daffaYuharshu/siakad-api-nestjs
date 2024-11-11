export class SubmitAnswerRequest {
  answers: SubmitAnswerItem[];
}

export class SubmitAnswerItem {
  student_id: number;
  notification_id: number;
  questionnaire_id: number;
  scale_value: number;
  submission_time: Date;
}

export class AnswerResponse {
  message: string;
}
