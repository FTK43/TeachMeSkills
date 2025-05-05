import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users-orm')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;
}
