// src/videos/schemas/video.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Video extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  videoUrl: string;

  @Prop({ default: 0 })
  likes: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
