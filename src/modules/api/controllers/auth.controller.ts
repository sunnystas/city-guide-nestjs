import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { User } from '../../../db/entity/user.entity';
import { EntityManager } from 'typeorm';
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
  constructor(
    private readonly authService: AuthService,
    private readonly entityManager: EntityManager
  ) { }

  /* login handler */
  @Post('login')
  @UseGuards(LocalAuthGuard)
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

  /* signup handler */
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
    try {
      const newUserEntity = this.entityManager.create(User, userData);
      await this.entityManager.save(User, newUserEntity);
      const { password, ...newUser } = newUserEntity;
      return newUser;
    } catch (e) {
      throw new BadRequestException(e.detail);
    }
  }
}
