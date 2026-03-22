import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Alice Johnson',
    description: 'Display name shown in the product.',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 'alice@openteam.hub',
    description: 'Unique email used for user identification.',
    maxLength: 255,
  })
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @ApiProperty({
    example: 'strong-password-123',
    description: 'Plain-text password sent by the client before hashing.',
    minLength: 6,
    maxLength: 255,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password!: string;
}
