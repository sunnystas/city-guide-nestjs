import { MigrationInterface, QueryRunner, getManager } from 'typeorm';
import { PointType } from '../entity/point-type.entity';

const pointTypes = [
  {
    name_uk: 'Станції швидкісного трамваю',
    name_ru: 'Станции скоростного трамвая',
    name_en: '',
    icon: null,
    sortOrder: null,
  },
  {
    name_uk: 'Історико-географічні райони міста',
    name_ru: 'Историко-географические районы города',
    name_en: '',
    icon: null,
    sortOrder: null,
  },
{
  name_uk: 'Залізничні вокзали',
  name_ru: 'Железнодорожные вокзалы',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Автовокзал',
  name_ru: 'Автовокзал',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Аеропорт',
  name_ru: 'Аеропорт',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Громадські вбиральні',
  name_ru: 'Общественные туалеты',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Міські та районні органи управління',
  name_ru: 'Городские и районные органы управления',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Заклади культури',
  name_ru: 'Учреждения культуры',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Музеї',
  name_ru: 'Музеи',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Заклади харчування',
  name_ru: 'Учреждения питания',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Горговельні заклади, супермаркети',
  name_ru: 'Торговые магазины, супермаркеты',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Місця відпочинку',
  name_ru: 'Места отдыха',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: `Об'єкти природи`,
  name_ru: 'Объекты природы',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Місця для дайвінгу',
  name_ru: 'Места для дайвинга',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Цирк',
  name_ru: 'Цирк',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Культові споруди',
  name_ru: 'Культовые сооружения',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Шахти',
  name_ru: 'Шахты',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Заводи',
  name_ru: 'Заводы',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Відвали',
  name_ru: 'Отвалы',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: `Кар'єри та провалля шахт`,
  name_ru: 'Карьеры и провалы шахт',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Готелі',
  name_ru: 'Отели',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Індустріальна спадщина',
  name_ru: 'Индустриальное наследие',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: `Об'єкти монументального мистецтва`,
  name_ru: 'Объекты монументального искусства',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: `Об'єкти історії та архітектури`,
  name_ru: 'Объекты истории и архитектуры',
  name_en: '',
  icon: null,
  sortOrder: null,
},
{
  name_uk: 'Місця огляду панорами міста',
  name_ru: 'Места обзора панорамы города',
  name_en: '',
  icon: null,
  sortOrder: null,
},
]

export class PointType1584011318375 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const entityManager = getManager();
    const pointTypeItems = entityManager.create(PointType, pointTypes);
    await entityManager.save(pointTypeItems);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('truncate table point_type cascade');
  }
}
