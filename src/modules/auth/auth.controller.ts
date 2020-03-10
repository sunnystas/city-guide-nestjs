import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { AuthService } from './auth.service';
import { RolesAllowed } from './roles-allowed.decorator';
import { User } from './../../db/entity/user.entity';
import { getManager } from 'typeorm';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiCreatedResponse({ description: 'The user has successfully logged in' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized: invalid credentials provided',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @ApiCreatedResponse({
    description: 'The user has been successfully created',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async signup(@Body() userData: User) {
    const entityManager = getManager();
    try {
      const newUserEntity = entityManager.create(User, userData);
      await entityManager.save(newUserEntity);
      const { password, ...newUser } = newUserEntity;
      return newUser;
    } catch (e) {
      throw new BadRequestException(e.detail);
    }
  }

  // @todo just for testing purposes - will remove later
  // @RolesAllowed('user')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get('test')
  // async test(@Request() req) {
  //   return 'ok';
  // }
}
