import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';

/**
 * 统一响应格式接口
 */
export interface ApiResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}

/**
 * 响应拦截器
 * 统一包装所有成功的响应为 {code, msg, data} 格式
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    // 获取自定义的响应消息
    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) || '操作成功';

    return next.handle().pipe(
      map(data => ({
        code: 200,
        msg: message,
        data,
      }))
    );
  }
}
