import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @MessagePattern({ cmd: 'toggle_like' }) handleLike(
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.likeService.toggleLike({
      ...body,
    });
  }

  @MessagePattern({ cmd: 'count_likes' })
  countLikes(
    @Query('targetId') targetId: string,
    @Query('targetType') targetType: string,
  ) {
    return this.likeService.countLikes(targetId, targetType);
  }
}
