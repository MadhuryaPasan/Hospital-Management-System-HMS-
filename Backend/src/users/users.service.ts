import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SafeUser } from './interfaces/safe-user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // this will used to remove the password from the response.
  private toSafeUser(user: User): SafeUser{
    const { password: _password, ...safeUser } = user;
    return safeUser;
  }

  // create user
  // async create(createUserDto: CreateUserDto) {
  async create(userData: Partial<User>) {
    // Partial<User>: any subset of the user properties.
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
    // return 'This action adds a new user';
  }

  async findAll(): Promise<SafeUser[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.toSafeUser(user));
    // return this.userRepository.find();
    // return `This action returns all users`;
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
    // return `This action returns a #${id} user`;
  }

  // Find by email
  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
    // return `This action should return user based on #${email}`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
    // return `This action removes a #${id} user`;
  }
}
