import {
  Controller,
  Headers,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import {
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { City } from '../../../db/entity/city.entity';
import { Languages } from '../../../common/enums/languages';
import { ApiHeaderLangInterceptor } from '../interceptors/api-header-lang.interceptor';

@ApiTags('Cities')
@UseInterceptors(ApiHeaderLangInterceptor)
@Controller('api/cities')
export class CityController {
  constructor( private readonly entityManager: EntityManager ) { }

  @ApiOkResponse({
    description: `Array of available cities`,
    schema: {
      type: `array`,
      items: {
        type: `object`,
        properties: {
          name: { type: `string` },
          coords: {
            type: `object`,
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
            }
          },
        }
      }
    }
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  async get(
    @Headers('accept-language') lang: Languages,
  ): Promise<City[]> {
    return await this.entityManager
      .createQueryBuilder(City, `city`)
      .select(`name_${lang}`, `name`)
      .addSelect(`coords`)
      .getRawMany();
  }
}