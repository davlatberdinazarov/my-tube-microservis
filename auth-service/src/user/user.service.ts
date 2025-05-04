import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.schema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { RegisterDto, LoginDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });
    await user.save();
    return { message: 'User registered' };
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new Error('Invalid password');

    const token = jwt.sign({ id: user._id, email: user.email }, 'SECRET_KEY');
    return { token };
  }

  async validateToken(token: string) {
    try {
      const data = jwt.verify(token, 'SECRET_KEY');
      return data;
    } catch {
      return null;
    }
  }
}
