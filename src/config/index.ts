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
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'effective_mobile',
    entities: ['src/entities/*.ts'],
    synchronize: process.env.NODE_ENV !== 'production',
  },
  app: {
    port: parseInt(process.env.PORT || '3000', 10),
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  },
};

export const AppDataSource = new DataSource(config.database);