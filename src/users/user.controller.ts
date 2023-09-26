import {
  Body,
  Controller,
  Delete,
  Get, HttpCode,
  Param,
  Post,
  Put
} from "@nestjs/common";
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import * as process from 'process';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: UserDto): Promise<UserDto> {
    return this.userService.save(user);
  }

  @Put(':id')
  updateUserById(
    @Param('id') id: string,
    @Body() user: UserDto,
  ): Promise<{ result: string }> {
    return this.userService.update(id, user);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }
}
