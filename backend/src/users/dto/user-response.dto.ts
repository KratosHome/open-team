import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Unique user identifier.',
  })
  id!: number;

  @ApiProperty({
    example: 'Alice Johnson',
    description: 'Display name shown in the product.',
  })
  name!: string;

  @ApiProperty({
    example: 'alice@openteam.hub',
    description: 'Unique email address.',
  })
  email!: string;

  @ApiProperty({
    example: '2026-03-22T12:00:00.000Z',
    description: 'Creation timestamp in ISO 8601 format.',
  })
  createdAt!: string;

  @ApiProperty({
    example: '2026-03-22T12:05:00.000Z',
    description: 'Last update timestamp in ISO 8601 format.',
  })
  updatedAt!: string;

  static fromEntity(user: User): UserResponseDto {
    const dto = new UserResponseDto();

    dto.id = user.id;
    dto.name = user.name;
    dto.email = user.email;
    dto.createdAt = user.createdAt.toISOString();
    dto.updatedAt = user.updatedAt.toISOString();

    return dto;
  }

  static fromEntities(users: User[]): UserResponseDto[] {
    return users.map((user) => UserResponseDto.fromEntity(user));
  }
}
