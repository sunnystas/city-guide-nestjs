import {
  Controller,
  Headers,
  Request,
  Get,
  Put,
  Query,
  Body,
  UseGuards,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesAllowed } from '../decorators/roles-allowed.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Info } from '../../../db/entity/info.entity';
import { InfoService } from './../services/info.service';
import { Languages } from '../../../common/enums/languages';
import { ApiHeadersInterceptor } from '../interceptors/api-headers.interceptor';
import { InfoDto } from '../dto/search-info-query.dto';

@ApiTags('Info')
@UseInterceptors(ApiHeadersInterceptor)
@Controller('api/info')
export class InfoController {
  constructor(
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
    @Headers('x-city') cityId: number,
    @Query() queryData: InfoDto,
  ) {
    const section = queryData.section;
    return await this.infoService.find({ lang, cityId, section });
  }

  @ApiOkResponse({
    description: `Info item has been successfully created or updated`,
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
    @Body() infoReqData: Info,
  ) {
    const infoData = Object.assign(infoReqData, { city });
    return await this.infoService.createOrUpdate(infoData);
  }

}