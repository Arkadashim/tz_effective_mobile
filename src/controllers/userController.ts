import { Request, Response } from 'express';
import { User, UserStatus } from '../entities/User';
import { AppError } from '../utils/AppError';
import { AppDataSource } from '../config';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const currentUser = (req as any).user;

    // Если пользователь получает данные не о себе и не является админом, запретить доступ
    if (currentUser.id !== userId && currentUser.role !== 'admin') {
      throw new AppError('Unauthorized', 403);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json(user);
  }

  async getAllUsers(req: Request, res: Response) {
    const currentUser = (req as any).user;
    
    // Доступ к списку всех пользователей доступен только администратору
    if (currentUser.role !== 'admin') {
      throw new AppError('Unauthorized', 403);
    }

    const users = await this.userRepository.find();
    res.json(users);
  }

  async blockUser(req: Request, res: Response) {
    const userId = req.params.id;
    const currentUser = (req as any).user;

    // Если пользователь блокирует не себя и не является админом, запретить доступ
    if (currentUser.id !== userId && currentUser.role !== 'admin') {
      throw new AppError('Forbidden', 403);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    user.status = UserStatus.INACTIVE;
    await this.userRepository.save(user);
    res.json({ message: 'User blocked successfully' });
  }
}