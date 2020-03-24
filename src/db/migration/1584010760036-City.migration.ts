import { MigrationInterface, QueryRunner } from 'typeorm';
import { City } from '../entity/city.entity';

const cities: any = [
  {
    name_uk: 'Кривий Ріг',
    name_ru: 'Кривой Рог',
    coords: '(47.900055,33.396661)'
  }
]

export class City1584010760036 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const cityItems = queryRunner.manager.create(City, cities);
    await queryRunner.manager.save(cityItems);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('truncate table city cascade');
  }
}
