import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  findAllActiveUsers(search?: string): Promise<User[]> {
    const query = this.createQueryBuilder('user').where(
      'user.isActive = :isActive',
      { isActive: true },
    );

    if (search) {
      query.andWhere(
        'user.username ILIKE :search OR user.email ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    return query.orderBy('user.id', 'DESC').getMany();
  }
}
