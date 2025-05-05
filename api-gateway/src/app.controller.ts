import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('VIDEO_SERVICE') private readonly videoClient: ClientProxy,
  ) {}

  // Auth routes
  @Post('register')
  async register(@Body() body: any) {
    return this.authClient.send({ cmd: 'register' }, body);
  }

  @Post('login')
  async login(@Body() body: any) {
    return this.authClient.send({ cmd: 'login' }, body);
  }

  @Get('verify-token')
  async verifyToken(@Body() body: any) {
    return this.authClient.send({ cmd: 'verify_token' }, body);
  }

  // Video routes with JWT Guard

  @UseGuards(JwtAuthGuard)
  @Post('videos')
  createVideo(@Body() body: any, @Req() req: any) {
    const userId = req.user.id;
    return this.videoClient.send({ cmd: 'create_video' }, { ...body, userId });
  }

  @Get('videos')
  getAllVideos() {
    return this.videoClient.send({ cmd: 'get_all_videos' }, {});
  }

  @Get('videos/:id')
  getVideo(@Param('id') id: string) {
    return this.videoClient.send({ cmd: 'get_video' }, id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('videos/:id')
  updateVideo(@Param('id') id: string, @Body() body: any, @Req() req: any) {
    const userId = req.user.id;
    return this.videoClient.send(
      { cmd: 'update_video' },
      { id, ...body, userId },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('videos/:id')
  deleteVideo(@Param('id') id: string) {
    return this.videoClient.send({ cmd: 'delete_video' }, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('videos/:id/like')
  likeVideo(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    return this.videoClient.send(
      { cmd: 'like_video' },
      { videoId: id, userId },
    );
  }
}
