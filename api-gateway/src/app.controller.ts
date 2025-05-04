import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  @Post('register')
  async register(@Body() body: any) {
    return this.client.send({ cmd: 'register' }, body);
  }

  @Post('login')
  async login(@Body() body: any) {
    return this.client.send({ cmd: 'login' }, body);
  }

  @Get('verify-token')
  async verifyToken(@Body() body: any) {
    return this.client.send({ cmd: 'verify_token' }, body);
  }
}
