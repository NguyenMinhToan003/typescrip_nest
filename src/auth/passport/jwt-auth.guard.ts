import { IS_PUBLIC_KEY } from '@/decorator/customize'
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }
  // canActivate() se duoc goi truoc khi request duoc xu ly( truoc khi den controller ) neu tra ve true thi request se duoc xu ly neu tra ve false thi request se bi block
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }
  // handleRequest() se duoc goi sau khi request duoc xu ly( sau khi den controller ) neu tra ve user thi request se duoc xu ly neu tra ve false thi request se bi block
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('access token không hợp lệ')
    }
    return user
  }
}
