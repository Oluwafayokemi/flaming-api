import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_MODEL } from '../constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL)
    private userModel: Model<User>,) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    }
    catch (err) {
      throw new Error(err)
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneAndUpdate(filterBy: {}, update: {}): Promise<User> {
    const newUpdate = await this.userModel.findOneAndUpdate(filterBy, update, { new: true });
    return newUpdate
  }

}
