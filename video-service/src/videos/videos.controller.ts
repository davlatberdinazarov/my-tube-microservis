import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VideosService } from './videos.service';
import { Video } from './video.schema';

@Controller()
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @MessagePattern({ cmd: 'create_video' })
  create(@Payload() data: Partial<Video>) {
    return this.videosService.create(data);
  }

  @MessagePattern({ cmd: 'get_all_videos' })
  findAll() {
    return this.videosService.findAll();
  }

  @MessagePattern({ cmd: 'get_video' })
  findById(@Payload() id: string) {
    return this.videosService.findById(id);
  }

  @MessagePattern({ cmd: 'update_video' })
  update(@Payload() payload: { id: string; [key: string]: any }) {
    const { id, ...data } = payload;
    return this.videosService.update(id, data);
  }

  @MessagePattern({ cmd: 'delete_video' })
  delete(@Payload() id: string) {
    return this.videosService.delete(id);
  }

  @MessagePattern({ cmd: 'like_video' })
  like(@Payload() id: string) {
    return this.videosService.like(id);
  }
}
