import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PointEntity } from '../../../db/entity/point.entity';
import { PointType } from '../../../db/entity/point-type.entity';
import { City } from '../../../db/entity/city.entity';
import { Rating } from '../../../db/entity/rating.entity';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(PointEntity) private readonly pointsRepository: Repository<PointEntity>,
  ) { }
  
  async find(options): Promise<PointEntity[]> {
    let skipItemsQuantity = 0;
    let takeItemsQuantity = 10;
    if (options.page && options.itemsperpage) {
      skipItemsQuantity = (options.page - 1) * options.itemsperpage;
      takeItemsQuantity = options.itemsperpage;
    }

    const query = this.pointsRepository
      .createQueryBuilder('point')
      .select(`point.id`, `id`)
      .addSelect(`point.name_${options.lang}`, `name`)
      .addSelect(`point.description_${options.lang}`, `description`)
      .addSelect(`point.coords`, `coords`)
      .addSelect(`point.pics`, `pics`)
      .addSelect(`point.videos`, `videos`)
      .addSelect(`point.url`, `url`)
      .addSelect(`point.top`, `top`)
      .addSelect(`point.work_hours`, `work_hours`)
      .addSelect(`point.email`, `email`)
      .addSelect(`point.phone`, `phone`)
      .addSelect(subQuery => {
        return subQuery
          .select('ROUND(AVG(rating_entity.rating), 2)')
          .from(Rating, 'rating_entity')
          .where('rating_entity.point = point.id');
      }, 'rating')
      .leftJoinAndSelect(subQuery => {
        return subQuery
          .select(`point_type.id`, `type_id`)
          .addSelect(`point_type.name_${options.lang}`, `type_name`)    // this point type extra data 
          .addSelect(`point_type.icon`, `type_icon`)                    // can be removed from here 
          .addSelect(`point_type."sort_order"`, `type_sort_order`)       // to reduce query payload size
          .from(PointType, `point_type`);
      }, 'point_type', `point.type = point_type.type_id`)
      .leftJoinAndSelect(subQuery => {
        return subQuery
          .select(`city.id`, `city_id`)
          .addSelect(`city.name_${options.lang}`, `city_name`)
          .from(City, `city`)
      }, 'city', `point.city = city.city_id`)
      .where('city.city_id = :cityid', { cityid: options.cityId });
    
    /* analyze query params */
    if (options.id) {
      query.andWhere(`id = :id`, { id: options.id });
    }
    if (options.typeid) {
      query.andWhere(`type_id = :type_id`, { type_id: options.typeid });
    }
    if (options.search) {
      query.andWhere(`LOWER(name_${options.lang}) like LOWER('%' || :search || '%')`, { search: options.search });
      // @todo FULL-TEXT search case insensitive
    }
    
    query
      .orderBy('type_sort_order', 'ASC')
      .addOrderBy('top', 'DESC')
      .addOrderBy('name', 'ASC');
    
    query
      .offset(skipItemsQuantity)
      .limit(takeItemsQuantity);

    return await query.getRawMany();
  }
}
