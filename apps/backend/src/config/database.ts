import { join } from 'node:path';

export default () => {
  // const isProd = process.env.NODE_ENV === 'production';
  return {
    database: {
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER || 'postgres',
      database: process.env.POSTGRES_NAME || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'healwrap',
      entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
      synchronize: true,
    },
  };
};
