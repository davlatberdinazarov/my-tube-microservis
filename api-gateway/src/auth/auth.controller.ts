import { Controller, Post, Body, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authClient.send({ cmd: 'register' }, body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authClient.send({ cmd: 'login' }, body);
  }

  @Get('verify-token')
  verifyToken(@Body() body: any) {
    return this.authClient.send({ cmd: 'verify_token' }, body);
  }
}
