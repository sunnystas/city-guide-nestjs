import {
  Controller,
  Get,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Languages } from '../../../common/enums/languages';

@ApiTags('Languages')
@Controller('api/languages')
export class LanguageController {
  @ApiOkResponse({
    description: `Array of available languages`,
    schema: {
      type: `array`,
      items: { type: `string` }
    }
  })
  @Get()
  async get() {
    return Object.values(Languages);
  }
}