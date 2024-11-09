import { Inject, Injectable } from '@nestjs/common';
import {
  AttendanceResponse,
  SubmitAttendanceRequest,
} from '../model/attendance.model';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { AttendanceValidation } from './attendance.validation';

@Injectable()
export class AttendanceService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async submit(request: SubmitAttendanceRequest): Promise<AttendanceResponse> {
    this.logger.info(`Submit new attendances ${JSON.stringify(request)}`);
    const submitRequest: SubmitAttendanceRequest =
      this.validationService.validate(AttendanceValidation.SUBMIT, request);

    await Promise.all(
      submitRequest.attendances.map(async (request) => {
        const attendance = await this.prismaService.attendance.create({
          data: request,
        });

        if (attendance.status == 'Hadir') {
          const notification = await this.prismaService.notification.create({
            data: {
              sent_time: new Date(),
              is_read: false,
            },
          });

          await this.prismaService.attendance.update({
            where: {
              id: attendance.id,
            },
            data: {
              notification_id: notification.id,
            },
          });
        }
      }),
    );

    return {
      message: 'Berhasil menyimpan presensi',
    };
  }
}
