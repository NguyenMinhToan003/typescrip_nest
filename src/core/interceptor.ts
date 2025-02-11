import { RESPONSE_MESSAGE_KEY } from '@/decorator/customize'
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler()
    const responseMessage =
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, handler) || 'Success'

    return next.handle().pipe(
      map((data) => {
        // Kiểm tra nếu data đã có statusCode (tức là đã qua ExceptionInterceptor), giữ nguyên
        if (data?.statusCode) return data

        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: responseMessage,
          data,
        }
      }),
    )
  }
}

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          const response = error.getResponse()
          const statusCode = error.getStatus()

          // Nếu response là object (thường là của HttpException), trích xuất message & data
          const errorMessage =
            typeof response === 'object' ? (response as any).message : response
          const errorData = (response as any)?.data || null

          const modifiedResponse = {
            statusCode,
            message: errorMessage,
            data: errorData,
          }

          return throwError(
            () => new HttpException(modifiedResponse, statusCode),
          )
        }

        return throwError(() => error)
      }),
    )
  }
}
