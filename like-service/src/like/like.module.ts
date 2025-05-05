import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from './schemas/like.schema';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    ],
    controllers: [LikeController],
    providers: [LikeService],
    exports: [],
})
export class LikeModule {
}
