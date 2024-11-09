export class QuestionnaireResponse {
  id: number;
  meeting_id: number;
  question_id: number;
  question: {
    id: number;
    text: string;
  };
}

