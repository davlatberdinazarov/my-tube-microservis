import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Body,
    Req,
    UseGuards,
    Inject,
  } from '@nestjs/common';
  import { ClientProxy } from '@nestjs/microservices';
  import { JwtAuthGuard } from 'auth/jwt-auth.guard';
  
  @Controller('videos')
  export class VideosController {
    constructor(
      @Inject('VIDEO_SERVICE') private readonly videoClient: ClientProxy,
    ) {}
  
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() body: any, @Req() req: any) {
      const userId = req.user.id;
      return this.videoClient.send({ cmd: 'create_video' }, { ...body, userId });
    }
  
    @Get()
    findAll() {
      return this.videoClient.send({ cmd: 'get_all_videos' }, {});
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.videoClient.send({ cmd: 'get_video' }, id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() body: any, @Req() req: any) {
      const userId = req.user.id;
      return this.videoClient.send(
        { cmd: 'update_video' },
        { id, ...body, userId },
      );
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.videoClient.send({ cmd: 'delete_video' }, id);
    }
  }
  