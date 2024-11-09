import {
  ExceptionFilter,
  HttpException,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // console.log('ErrorFilter triggered:', exception);
    // console.log(exception instanceof HttpException)
    // console.log(exception instanceof ZodError)
    const response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        errors: exception.getResponse(),
      });
    } else if (exception instanceof ZodError) {
      response.status(400).json({
        errors: 'Validation error',
      });
    } else {
      response.status(500).json({
        errors: exception.message,
      });
    }
  }
}
