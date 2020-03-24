import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Languages } from '../../../common/enums/languages';

@Injectable()
export class ApiHeadersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const languages = Object.values(Languages);
    if (!languages.includes(req.headers['accept-language'])) {
      throw new BadRequestException(`Wrong or missing Accept-Language header. Possible values: ${languages}`);
    }
    if (!req.headers['x-city'] || isNaN(req.headers['x-city'])) {
      throw new BadRequestException('X-City header is missing or is NaN');
    }
    return next.handle();
  }
}
