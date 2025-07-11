import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

router.get('/:id', authMiddleware, userController.getUserById.bind(userController));
router.get('/', authMiddleware, userController.getAllUsers.bind(userController));
router.patch('/:id/block', authMiddleware, userController.blockUser.bind(userController));

export default router;