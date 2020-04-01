import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiHeaderCityInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    if (!req.headers['x-city'] || isNaN(req.headers['x-city'])) {
      throw new BadRequestException('X-City header is missing or is NaN');
    }
    return next.handle();
  }
}
