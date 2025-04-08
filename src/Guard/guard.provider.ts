import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard'
import { APP_GUARD } from '@nestjs/core'

export const guardProvier = [
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
]
