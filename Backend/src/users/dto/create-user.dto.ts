import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Pasan Perera',
    description: 'Full name of the user',
  })
  @IsString() // reject numbers, arrays booleans, etc
  @IsNotEmpty() // reject empty values
  name: string;

  @ApiProperty({
    example: 'user123@gmail.com',
    description: 'User email address',
  })
  @IsEmail() //validate email
  email: string;

  @ApiProperty({
    example: 'Password123',
    description: 'User password',
  })
  @IsString()
  @MinLength(6)
  password: string;
}

// defines what a POST request should look like.
