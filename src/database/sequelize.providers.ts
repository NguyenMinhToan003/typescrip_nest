import { Sequelize } from 'sequelize'

export const sequelizeProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'nest',
      })
      await sequelize.sync()
      return sequelize
    },
  },
]
