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
    @InjectRepository(Path) private readonly pathssRepository: Repository<Path>,
  ) { }
  
  async find(options): Promise<Path[]> {
    return options;
  }
}
