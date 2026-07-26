import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString() // reject numbers, arrays booleans, etc
  @IsNotEmpty() // reject empty values
  name: string;

  @IsEmail() //validate email
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

// defines what a POST request should look like.
