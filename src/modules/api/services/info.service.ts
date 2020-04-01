import { Injectable } from '@nestjs/common';
import { Info } from '../../../db/entity/info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';

@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(Info) private readonly infoRepository: Repository<Info>,
  ) { }

  async find(options): Promise<Info> {
    return await this.infoRepository
      .createQueryBuilder()
      .select(`info.name_${options.lang}`, `title`)
      .addSelect(`info.description_${options.lang}`, `content`)
      .addSelect(`info.section_name`, `section`)
      .from(Info, 'info')
      .where({ city: options.cityId })
      .andWhere(`info.section_name = :name`, { name: options.sectionName })
      .getRawOne();
  }
}
