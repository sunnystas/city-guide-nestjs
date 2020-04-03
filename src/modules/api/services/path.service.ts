import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets, createQueryBuilder } from 'typeorm';
import { Path } from '../../../db/entity/path.entity';
import { City } from '../../../db/entity/city.entity';
import { Guide } from '../../../db/entity/guide.entity';
import { FullTextSearchHelper } from '../../../common/helpers/fts.helper';

@Injectable()
export class PathService {
  constructor(
    @InjectRepository(Path) private readonly pathRepository: Repository<Path>,
  ) { }
  
  async find(options): Promise<Path[]> {
    let skipItemsQuantity = 0;
    let takeItemsQuantity = 10;
    if (options.page && options.itemsperpage) {
      skipItemsQuantity = (options.page - 1) * options.itemsperpage;
      takeItemsQuantity = options.itemsperpage;
    }

    const query = this.pathRepository
      .createQueryBuilder('path')
      .select(`path.id`, `id`)
      .addSelect(`path.name_${options.lang}`, `name`)
      .addSelect(`path.description_${options.lang}`, `description`)
      .addSelect(`path.points`, `points`)
      .addSelect(`path.duration_hours`, `duration_hours`)
      .addSelect(`path.length_metres`, `length_metres`)
      .addSelect(`path.pics`, `pics`)
      .addSelect(`path.videos`, `videos`)
      .addSelect(`path.expires_at`, `expires_at`)
      .leftJoinAndSelect(subQuery => {
        return subQuery
          .select(`city.id`, `city_id`)
          .addSelect(`city.name_${options.lang}`, `city_name`)
          .from(City, `city`)
      }, 'city', `path.city = city.city_id`)
      .where('city.city_id = :cityid', { cityid: options.city });
    
    /* analyze query params */
    if (options.id) {
      query.andWhere(`id = :id`, { id: options.id });
    }

    if (options.search) {
      const queryString = FullTextSearchHelper.genQueryStr('path', options);
      if (queryString) {
        query.andWhere(new Brackets(qb => qb.where(queryString)));
      }
    }
    
    query
      .orderBy('name', 'ASC');
    
    query
      .offset(skipItemsQuantity)
      .limit(takeItemsQuantity);
    
    return await query.getRawMany();
  }
}
