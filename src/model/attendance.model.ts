export class SubmitAttendanceRequest {
  attendances: SubmitAttendanceItem[];
}

export class SubmitAttendanceItem {
  student_id: number;
  meeting_id: number;
  status: string;
  time: Date;
}

export class AttendanceResponse {
  message: string;
}


