import {
  Controller,
  Headers,
  Request,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  UseGuards,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiHeader,
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
import { PointEntity } from '../../../db/entity/point.entity';
import { PointsService } from '../services/point.service';
import { SearchQueryDto } from '../dto/search-query.dto';
import { Languages } from '../../../common/enums/languages';
import { ApiHeaderLangInterceptor } from '../interceptors/api-header-lang.interceptor';
import { ApiHeaderCityInterceptor } from '../interceptors/api-header-city.interceptor';

@ApiTags('Points')
@UseInterceptors(ApiHeaderLangInterceptor)
@UseInterceptors(ApiHeaderCityInterceptor)
@Controller('api/points')
export class PointsController {
  constructor(
    private readonly pointsService: PointsService,
  ) { }

  /* GET points */
  @ApiQuery({
    name: 'id',
    schema: {
      type: 'number'
    },
    required: false,
    description: 'Point id',
  })
  @ApiQuery({
    name: 'typeid',
    schema: {
      type: 'number'
    },
    required: false,
    description: `Point's type id`,
  })
  @ApiQuery({
    name: 'search',
    schema: {
      type: 'string'
    },
    required: false,
    description: 'Search by name or description',
  })
  @ApiQuery({
    name: 'page',
    schema: {
      type: 'number'
    },
    required: false,
    description: 'Extract page #',
  })
  @ApiQuery({
    name: 'itemsperpage',
    schema: {
      type: 'number'
    },
    required: false,
    description: 'Set the amount of items per page',
  })
  @ApiOkResponse({
    isArray: true,
    description: 'Array of extracted points',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name:	{ type: 'string' },
          description:	{ type: 'string' },
          coords: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
            }
          },
          top:	{ type: 'number' },
          pics: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Array of relative paths to point pics'
          },
          videos: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Array of relative paths to point videos'
          },
          url: { type: 'string' },
          workHours:	{ type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
          type_id:	{ type: 'number' },
          type_name: { type: 'string' },
          type_icon: { type: 'string' },
          type_sort_order:	{ type: 'number' },
          city_id:	{ type: 'number' },
          city_name: { type: 'string' },
          rating:	{ type: 'number' },
        }
      }
    },
  })
  @ApiBadRequestResponse({
    description: 'Wrong header(s) or query parameter(s)',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  async get(
    @Headers('accept-language') lang: Languages,
    @Headers('x-city') cityId: number,
    @Query() searchQueryParams: SearchQueryDto
  ) {
    const options = Object.assign(searchQueryParams, { lang, cityId });
    return await this.pointsService.find(options);
  }

  @ApiOkResponse({
    description: `Point successfully created`,
    type: PointEntity,
  })
  @ApiBadRequestResponse({
    description: 'Wrong header(s) or query parameter(s)',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post()
  async create(
    @Headers('accept-language') lang: Languages,
    @Headers('x-city') cityId: number,
    @Body() pointParams: PointEntity,
  ) {
    Object.assign(pointParams, { city: +cityId });
    try {
      return await this.pointsService.createOrUpdate(pointParams);
    } catch (e) {
      throw new BadRequestException(e.detail.toString());
    }
  }
}
