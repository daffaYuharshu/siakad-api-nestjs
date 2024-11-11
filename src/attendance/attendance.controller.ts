import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { WebResponse } from '../model/web.model';
import {
  AttendanceResponse,
  SubmitAttendanceRequest,
} from '../model/attendance.model';

@Controller('/meetings/:meetingId/attendances')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post()
  async submit(
    @Param('meetingId', ParseIntPipe) meetingId: number,
    @Body() request: SubmitAttendanceRequest,
  ): Promise<WebResponse<AttendanceResponse>> {
    request.attendances.map((attendance) => {
      attendance.meeting_id = meetingId;
      attendance.time = new Date();
    });
    
    const result = await this.attendanceService.submit(request);
    return {
      data: result,
    };
  }
}
