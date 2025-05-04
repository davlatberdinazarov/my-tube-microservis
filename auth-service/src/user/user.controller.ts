import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './user.service';
import { RegisterDto, LoginDto } from './dto/user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'register' })
  register(dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @MessagePattern({ cmd: 'login' })
  login(dto: LoginDto) {
    return this.authService.login(dto);
  }

  @MessagePattern({ cmd: 'verify_token' })
  verify(token: string) {
    return this.authService.validateToken(token);
  }
}
