import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, Length, IsDateString } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Length(2, 100)
  fullName: string;

  @Column()
  @IsDateString()
  birthDate: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Length(8)
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;
}
