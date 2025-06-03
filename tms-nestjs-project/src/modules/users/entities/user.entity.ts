import { Role } from 'src/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 'unknown' })
  email: string;

  @Column({ nullable: false, default: 'unknown' })
  name: string;

  @Column({ nullable: false, default: 'unknown' })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: 'user',
  })
  role: Role;
}
