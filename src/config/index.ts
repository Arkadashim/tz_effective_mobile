import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenv.config();

interface AppConfig {
  port: number;
  jwtSecret: string;
}

export const config: {
  database: DataSourceOptions;
  app: AppConfig;
} = {
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'effective_mobile',
    entities: ['src/entities/*.ts'],
    synchronize: process.env.NODE_ENV !== 'production',
  },
  app: {
    port: parseInt(process.env.PORT || '3000', 10),
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  },
};

export const AppDataSource = new DataSource(config.database);