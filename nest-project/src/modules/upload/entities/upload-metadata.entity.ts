import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UploadMetadataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalName: string;

  @Column()
  mimetype: string;

  @Column()
  path: string;

  @CreateDateColumn()
  createdAt: Date;
}
