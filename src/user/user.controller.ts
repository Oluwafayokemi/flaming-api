import { LoginUserDto } from './dto/login-user.dto';
import { ValidationPipe } from './../validation.pipe';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/user.interface'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  
  @Post('signup')
  async create(@Body(new ValidationPipe()) user: CreateUserDto) {
    try {
      return this.userService.create(user);
    }
    catch (err) {
      throw new Error(err)
    }
  }
  
  @Post('login')
  async login(@Body(new ValidationPipe()) user: LoginUserDto) {
    try {
      return this.userService.login(user);
    }
    catch (err) {
      throw new Error(err)
    }
  }

  @Get()
  async get(): Promise<User[]> {
    return this.userService.findAll()
  }
}
