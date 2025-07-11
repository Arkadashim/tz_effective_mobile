import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { validate } from "class-validator";
import { AppError } from "../utils/AppError";
import { config } from "../config";

export class AuthController {
  private userRepository = getRepository(User);
  private readonly JWT_SECRET = config.app.jwtSecret;

  async register(req: Request, res: Response) {
    const { fullName, birthDate, email, password } = req.body;
    const user = new User();
    user.fullName = fullName;
    user.birthDate = birthDate;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new AppError("Validation failed", 400, errors);
    }

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new AppError("Email already exists", 400);
    }

    const savedUser = await this.userRepository.save(user);
    const token = jwt.sign(
      { id: savedUser.id, role: savedUser.role },
      this.JWT_SECRET
    );

    res.status(201).json({ user: savedUser, token });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError("Invalid credentials", 401);
    }

    if (user.status === "inactive") {
      throw new AppError("User account is inactive", 403);
    }

    const token = jwt.sign({ id: user.id, role: user.role }, this.JWT_SECRET);
    res.json({ user, token });
  }
}
