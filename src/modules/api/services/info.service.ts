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
      .addSelect(`info.section`, `section`)
      .from(Info, 'info')
      .where({ city: options.cityId })
      .andWhere(`info.section = :name`, { name: options.section })
      .getRawOne();
  }

  async createOrUpdate(infoData: Info): Promise<Info> {
    const infoItem = this.infoRepository.find({
      where: { section: infoData.section }
    });
    if (infoItem) {
      await this.infoRepository.update({ section: infoData.section }, infoData);
      return await this.infoRepository.findOne({
        where: { section: infoData.section }
      });
    } else {
      const newInfoItem = await this.infoRepository.create(infoData);
      return this.infoRepository.save(newInfoItem);
    }
  }
}
