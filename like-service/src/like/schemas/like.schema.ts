import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LikeDocument = Like & Document;

@Schema({ timestamps: true })
export class Like {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  targetId: string; // Video yoki Comment ID

  @Prop({ required: true, enum: ['video', 'comment'] })
  targetType: 'video' | 'comment';

  @Prop({ required: true, enum: ['like', 'dislike'] })
  type: 'like' | 'dislike';
}

export const LikeSchema = SchemaFactory.createForClass(Like);
