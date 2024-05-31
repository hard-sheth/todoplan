import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpCronlogService } from './http-cronlog/http-cronlog.service';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(private httplog: HttpCronlogService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        Logger.log(
          `Request completed: ${request.method} ${request.path} - ${response.statusCode} - ${duration}ms`,
        );
        this.httplog.httpSuccess(
          request.path,
          request.method,
          request.query,
          request.body,
          request.ip,
          duration,
        );
      }),
      catchError((error) => {
        const duration = Date.now() - now;
        Logger.error(
          `Request Error: ${request.method} ${request.path} - body - ${request.body ? JSON.stringify(request.body) : ''} - ${error} - ${duration}ms`,
        );
        this.httplog.httpError(
          request.path,
          request.method,
          request.query,
          request.body,
          request.ip,
          error,
          duration,
        );
        return throwError(error);
      }),
    );
  }
}
