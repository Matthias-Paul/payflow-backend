
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
   ssl: { 
    rejectUnauthorized: false, 
  },
  password: process.env.DB_PASSWORD,
  autoLoadEntities:
    process.env.DB_AUTO_LOAD !== undefined
      ? process.env.DB_AUTO_LOAD === 'true'
      : true,
}));



