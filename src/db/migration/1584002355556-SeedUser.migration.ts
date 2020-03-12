import { MigrationInterface, QueryRunner, getManager } from 'typeorm';
import { User } from '../entity/user.entity';

const users: any = [
  {
    email: 'adm@adm.adm',
    password: 'adm',
    firstName: 'Admin',
    lastName: 'Admin',
    role: 'admin',
    isActive: true,
  },
  {
    email: 'user@user.user',
    password: 'user',
    firstName: 'User',
    lastName: 'User',
    role: 'user',
    isActive: true,
  },
];

export class SeedUser1584002355556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const entityManager = getManager();
    const userItems = entityManager.create(User, users);
    await entityManager.save(userItems);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.clearTable('user');
  }
}
