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
        coords: '(47.901952, 33.330391)',
        pics: '{https://i.pinimg.com/474x/56/5a/2d/565a2d81cd7e87268a2446ac72df4325.jpg,https://i.pinimg.com/474x/56/5a/2d/565a2d81cd7e87268a2446ac72df4325.jpg}',
        videos: '{https://youtu.be/DEqVaPVnQwc,https://youtu.be/DEqVaPVnQwc}',
        url: 'https://youtu.be/DEqVaPVnQwc',
        work_hours: '10:00-12:00',
        email: 'some@email.com',
        phone: '+38099-999-99-99',
      },
      {
        name_uk: 'Деяка точка на мапі',
        description_uk: 'відмінний опис інший геть мовою рідною',
        name_ru: 'Точка на карте',
        description_ru: 'отличие в описании другое',
        name_en: 'Some point on the map',
        description_en: 'Sample point on the map',
        type: pointType,
        city: pointCity,
        coords: '(47.901952, 33.330391)',
        pics: '{https://i.pinimg.com/474x/56/5a/2d/565a2d81cd7e87268a2446ac72df4325.jpg,https://i.pinimg.com/474x/56/5a/2d/565a2d81cd7e87268a2446ac72df4325.jpg}',
        videos: '{https://youtu.be/DEqVaPVnQwc,https://youtu.be/DEqVaPVnQwc}',
        url: 'https://youtu.be/DEqVaPVnQwc',
        work_hours: '10:00-12:00',
        email: 'some@email.com',
        phone: '+38099-999-99-99',
      },
    ]
    const newPointItems = queryRunner.manager.create(PointEntity, pointEntities);
    await queryRunner.manager.save(newPointItems);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('truncate table point_entity cascade');
  }
}
