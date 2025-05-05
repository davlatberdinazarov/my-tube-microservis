import { Controller, Post, Get, Param, Req, Query, UseGuards, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@Controller('likes')
export class LikesController {
  constructor(
    @Inject('LIKES_SERVICE') private readonly likesClient: ClientProxy,
  ) {}

  // Video like qilish
  @UseGuards(JwtAuthGuard)
  @Post('video/:id')  // Video ID'ni params orqali olamiz
  likeVideo(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;  // Token'dan userId olamiz
    return this.likesClient.send(
      { cmd: 'toggle_like' },  // Like qilish yoki olib tashlash uchun cmd
      {
        userId,
        targetId: id,          // Video ID params orqali
        targetType: 'video',   // Target turi
        type: 'like',          // Yoki 'dislike' bo‘lishi mumkin
      },
    );
  }

  // Video like/dislike sonini olish
  @Get('count')
  count(@Query('targetId') targetId: string, @Query('targetType') targetType: string) {
    return this.likesClient.send({ cmd: 'count_likes' }, { targetId, targetType });
  }
}
