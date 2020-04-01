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

@ApiTags('Info')
@UseInterceptors(ApiHeadersInterceptor)
@Controller('api/info')
export class InfoController {
  constructor(
    private readonly infoService: InfoService,
  ) { }

  @ApiOkResponse({
    description: `Info section data`,
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
    @Query(`name`) sectionName: string,
  ) {
    return await this.infoService.find({ lang, cityId, sectionName });
  }

}