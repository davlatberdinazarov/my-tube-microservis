import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './video.schema';

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  async create(data: Partial<Video>): Promise<Video> {
    const video = new this.videoModel(data);
    return video.save();
  }

  async findAll(): Promise<Video[]> {
    return this.videoModel.find();
  }

  async findById(id: string): Promise<Video> {
    const video = await this.videoModel.findById(id);
    if (!video) throw new NotFoundException('Video topilmadi');
    return video;
  }

  async update(id: string, data: Partial<Video>): Promise<Video> {
    const video = await this.videoModel.findByIdAndUpdate(id, data, { new: true });
    if (!video) throw new NotFoundException('Video topilmadi');
    return video;
  }

  async delete(id: string): Promise<void> {
    const result = await this.videoModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Video topilmadi');
  }

  async like(id: string): Promise<Video> {
    const video = await this.videoModel.findById(id);
    if (!video) throw new NotFoundException('Video topilmadi');
    video.likes += 1;
    return video.save();
  }
}
