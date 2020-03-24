import { MigrationInterface, QueryRunner } from 'typeorm';
import { PointEntity } from '../entity/point.entity';
import { PointType } from '../entity/point-type.entity';
import { City } from '../entity/city.entity';

export class PointEntity1584968670977 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const pointType = await queryRunner.manager.findOne(PointType);
    const pointCity = await queryRunner.manager.findOne(City);
    const pointEntities = [
      {
        name_uk: 'Деяка точка на мапі',
        description_uk: 'Деяка точка на мапі приклад щоб було',
        name_ru: 'Точка на карте',
        description_ru: 'Какая-то точка на карте пример чтобы было',
        name_en: 'Some point on the map',
        description_en: 'Sample point on the map',
        type: pointType,
        city: pointCity,
        ratings: null,
        coords: '(47.901952, 33.330391)',
      },
    ]
    const newPointItems = queryRunner.manager.create(PointEntity, pointEntities);
    await queryRunner.manager.save(newPointItems);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('truncate table point_entity cascade');
  }
}
