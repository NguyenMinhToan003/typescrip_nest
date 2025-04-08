import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'

export const databaseProviders = [
  {
    imports: [ConfigService],
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get<string>('HOST_MYSQL'),
        port: configService.get<number>('PORT_MYSQL'),
        username: configService.get<string>('USERNAME_MYSQL'),
        password: configService.get<string>('PASSWORD_MYSQL'),
        database: configService.get<string>('DATABASE_MYSQL'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      })
      return dataSource.initialize()
    },
  },
]
