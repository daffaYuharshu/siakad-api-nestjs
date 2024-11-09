export class NotificationResponse {
  id: number;
  sent_time: Date;
  attendance: {
    id: number,
    meeting_id: number;
  };
}
