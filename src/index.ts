import express from 'express';
import { AppDataSource, config } from './config';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

async function bootstrap() {
  await AppDataSource.initialize();
  
  app.use(express.json());

  app.use('/api/users', userRoutes);
  app.use('/api/auth', authRoutes);

  app.use(errorHandler);

  app.listen(config.app.port, () => {
    console.log(`Server running on port ${config.app.port}`);
  });
}

bootstrap().catch(console.error);