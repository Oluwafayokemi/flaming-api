
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/user.interface'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  
  @Post()
  async create(@Body() body: CreateUserDto) {
    try {
      return this.userService.create(body);
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
