import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { createConnection } from 'typeorm';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

async function bootstrap() {
  await createConnection({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['src/entities/*.ts'],
    synchronize: true,
  });

  app.use(express.json());
  app.use('/api/users', userRoutes);
  app.use('/api/auth', authRoutes);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap().catch(console.error);
