import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like, LikeDocument } from './schemas/like.schema';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like.name) private likeModel: Model<LikeDocument>) {}

  async toggleLike(data: {
    userId: string;
    targetId: string;
    targetType: 'video' | 'comment';
    type?: 'like' | 'dislike'; // optional qildik, default 'like'
  }) {
    const { userId, targetId, targetType, type = 'like' } = data;

    const existing = await this.likeModel.findOne({
      userId,
      targetId,
      targetType,
    });

    if (existing) {
      if (existing.type === type) {
        // remove like/dislike
        await existing.deleteOne();
        return { message: 'Removed' };
      } else {
        // update to opposite
        existing.type = type;
        await existing.save();
        return { message: 'Updated' };
      }
    } else {
      const like = new this.likeModel({ userId, targetId, targetType, type });
      await like.save();
      return { message: 'Created' };
    }
  }

  async countLikes(targetId: string, targetType: string) {
    const likes = await this.likeModel.countDocuments({ targetId, targetType, type: 'like' });
    const dislikes = await this.likeModel.countDocuments({ targetId, targetType, type: 'dislike' });
    return { likes, dislikes };
  }
}
