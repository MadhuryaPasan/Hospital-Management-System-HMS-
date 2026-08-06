import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, // for jwt authentication
  ) {} // inject user service

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    //cheking duplicate
    if (existingUser) {
      this.logger.warn(
        `Registration failed: Email already exists (${registerDto.email})`,
      );
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
      role: Role.Patient,
    };

    //save the user
    const user = await this.usersService.create(userData);

    this.logger.log(`New user registered: ${user.email} (${user.role})`);

    // remove the password from the response
    const { password, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      this.logger.warn(`Login failed: Unknown email (${loginDto.email})`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.logger.warn(`Login failed: Incorrect password (${loginDto.email})`);
      throw new UnauthorizedException('Invalid email or password');
    }

    // JWT creation
    const payload = {
      sub: user.id, // use sub(subject) insted of id because of a standard.
      email: user.email,
    };
    const accessTocken = await this.jwtService.signAsync(payload);
    this.logger.log(`User logged in: ${user.email}`);

    return {
      access_token: accessTocken,
    };
  }

  // test
  async test() {
    return this.usersService.findAll(); // from users.service.ts
  }
}
