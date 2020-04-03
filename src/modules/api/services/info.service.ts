import { Injectable } from '@nestjs/common';
import { Info } from '../../../db/entity/info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(Info) private readonly infoRepository: Repository<Info>,
  ) { }

  async find(options): Promise<Info[]> {
    const title = `"info"."name_${options.lang}"`;
    return await this.infoRepository
      .createQueryBuilder(`info`)
      .select(`"info"."name_${options.lang}"`, `title`)
      .addSelect(`"info"."description_${options.lang}"`, `content`)
      .addSelect(`"info"."section"`, `section`)
      .where({ city: options.city })
      .getRawMany();
  }
}
