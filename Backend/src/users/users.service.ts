import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // create user
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
    // return 'This action adds a new user';
  }

  async findAll() {
    return this.userRepository.find();
    // return `This action returns all users`;
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
    // return `This action returns a #${id} user`;
  }

  // Find by email
  findByEmail(email: string) {
    return `This action should return user based on #${email}`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
