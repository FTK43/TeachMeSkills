import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from '../entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }
  async findActiveUsers(search?: string): Promise<Users[]> {
    const query = this.createQueryBuilder('user').where(
      'user.isActive = :active',
      { active: true },
    );
    if (search) {
      query.andWhere('user.name ILIKE :search OR user.email ILIKE :search', {
        search: `%${search}%`,
      });
    }
    return query.orderBy('user.id', 'DESC').getMany();
  }
}
