import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entity/user.entity';

const users: any = [
  {
    email: 'adm@adm.adm',
    password: 'adm',
    first_name: 'Admin',
    last_name: 'Admin',
    role: 'admin',
    is_active: true,
  },
  {
    email: 'user@user.user',
    password: 'user',
    first_name: 'User',
    last_name: 'User',
    role: 'user',
    is_active: true,
  },
];

export class SeedUser1584002355556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userItems = queryRunner.manager.create(User, users);
    await queryRunner.manager.save(userItems);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.clearTable('user');
  }
}
