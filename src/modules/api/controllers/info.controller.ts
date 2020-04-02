import {
  Controller,
  Headers,
  Get,
  Put,
  Query,
  Body,
  Res,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InjectEntityManager } from '@nestjs/typeorm'; 
import { EntityManager } from 'typeorm';
import { RolesAllowed } from '../decorators/roles-allowed.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Info } from '../../../db/entity/info.entity';
import { InfoService } from './../services/info.service';
import { Languages } from '../../../common/enums/languages';
import { ApiHeaderLangInterceptor } from '../interceptors/api-header-lang.interceptor';
import { ApiHeaderCityInterceptor } from '../interceptors/api-header-city.interceptor';
import { InfoDto } from '../dto/search-info-query.dto';
import { DeleteDto } from '../dto/delete-query.dto';

@ApiTags('Info')
@UseInterceptors(ApiHeaderLangInterceptor)
@UseInterceptors(ApiHeaderCityInterceptor)
@Controller('api/info')
export class InfoController {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly infoService: InfoService,
  ) { }

  @ApiOkResponse({
    description: `Info data`,
    schema: {
      type: `object`,
      properties: {
        title: { type: `string` },
        content: { type: `string` },
        section: { type: `string` },
      }
    }
  })
  @Get()
  async get(
    @Headers('accept-language') lang: Languages,
    @Headers('x-city') city: number,
    @Query() queryData: InfoDto,
  ) {
    const section = queryData.section;
    return await this.infoService.find({ lang, city, section });
  }

  @ApiCreatedResponse({
    description: `Info item has been successfully created`,
    type: Info,
  })
  @ApiOkResponse({
    description: `Info item has been successfully updated`,
    type: Info,
  })
  @ApiBadRequestResponse({
    description: 'Wrong header(s) or query parameter(s)',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Put()
  async createOrUpdate(
    @Headers('x-city') city: number,
    @Body() infoData: Info,
    @Res() res,
  ) {
    Object.assign(infoData, { city });
    let item, statusCode = 200;
    const whereCond = { section: infoData.section };
    const infoItem = await this.entityManager.findOne(Info, { where: whereCond });
    if (!infoItem) {
      item = await this.entityManager.save(Info, infoData);
      statusCode = 201;
    } else {
      await this.entityManager.update(Info, whereCond, infoData);
      item = await this.entityManager.findOne(Info, { where: whereCond });
    }
    return res.status(statusCode).send(item);
  }

  /* DELETE info */
  @ApiQuery({
    name: 'id',
    schema: {
      type: 'number'
    },
    required: true,
    description: `Info item ID`,
  })
  @ApiResponse({
    status: 204,
    description: `Info item successfully deleted`,
  })
  @ApiNotFoundResponse({ description: `Info item not found` })
  @Delete()
  async delete(
    @Headers('accept-language') lang: Languages,
    @Headers('x-city') city: number,
    @Query() params: DeleteDto,
    @Res() res,
  ) {
    let statusCode = 204, message = `Deleted`;
    try {
      const result = await this.entityManager.delete(Info, { id: params.id, city: city });
      if (!result.affected) {
        statusCode = 404;
        message = 'Info item not found';
      }
    } catch (e) {
      statusCode = 400;
      message = e.detail;
    }
    return res.status(statusCode).send(message);
  }
}