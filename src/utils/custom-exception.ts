import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';

@Catch(BadRequestException)
export class CustomValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = exception.getStatus();
    const validationErrors = exception.getResponse() as any[];
    const errorMessages = this.flattenValidationErrors(validationErrors);
    response.status(statusCode).json({
      statusCode,
      message: errorMessages,
      error: 'Bad Request',
    });
  }

  private flattenValidationErrors(errors: any[]): string {
    let errorMessages = '';
    if (Array.isArray(errors['message'])) {
      for (const iterator of errors['message']) {
        errorMessages = iterator;
        break;
      }
    } else {
      errorMessages = errors['message'];
    }
    return errorMessages;
  }
}
