import { Model } from 'mongoose';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './interface/user.interface';
import { CreateUserDto, LoginUserDto } from './dto';
import { USER_MODEL } from '../constants';
const bcrypt = require('bcrypt');

const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL)
    private userModel: Model<User>,
  ) {}

  async create(user: CreateUserDto): Promise<any> {
    const filterBy = { email: user?.email };
    const password = user?.password;
    let hashedPsw = '';
    if (password) {
      hashedPsw = await bcrypt.hash(password, saltRounds);
    }
    try {
      const createdUser = await this.userModel.findOneAndUpdate(
        filterBy,
        { ...user, password: hashedPsw },
        {
          upsert: true,
          new: true,
        },
      );
      const { email, country, name, state, views } = createdUser;
      return {
        email,
        country,
        name,
        state,
        views,
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  async login(user: LoginUserDto): Promise<any> {
    const filterBy = { email: user.email };
    const password = user?.password;
    let hashedPsw = '';

    try {
      const createdUser = await this.userModel.findOne(filterBy);
      console.log(createdUser);
      const hash = createdUser?.password;
      if (password && hash) {
        hashedPsw = await bcrypt.compare(password, hash);
      }
      if (!hashedPsw) {
        return {
          status: 404,
          message: 'User Not Found',
        };
      }
      const { email, country, name, state, views } = createdUser;
      return { email, country, name, state, views };
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneAndUpdate(filterBy: {}, update: {}): Promise<User> {
    const newUpdate = await this.userModel.findOneAndUpdate(filterBy, update, {
      new: true,
    });
    return newUpdate;
  }
}
