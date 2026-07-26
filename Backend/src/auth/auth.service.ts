import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {} // inject user service

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    //cheking duplicate
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      10, //salt rounds (or cost factor).
    );

    // create a new object
    const userData = {
      ...registerDto,
      password: hashedPassword,
    };

    //save the user
    const user = await this.usersService.create(userData);

    // remove the password from the response
    const { password, ...result } = user;
    return result;
  }

  // test
  async test() {
    return this.usersService.findAll(); // from users.service.ts
  }
}
