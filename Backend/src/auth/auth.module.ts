import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { SignOptions } from 'jsonwebtoken';
import { RolesGuard } from './guards/roles/roles.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.getOrThrow(
            'JWT_EXPIRES_IN',
          ) as SignOptions['expiresIn'],
        },
      }),
    }),
  ], // import user module
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
})
export class AuthModule {}
