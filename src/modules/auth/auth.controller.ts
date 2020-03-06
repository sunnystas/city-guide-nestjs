import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { AuthService } from './auth.service';
import { Roles } from './roles.decorator';
import {
  ApiBody,
  ApiCreatedResponse,
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

  // @todo just for testing purposes - will remove later
  // @Roles('user')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get('test')
  // async test(@Request() req) {
  //   return 'ok';
  // }
}
