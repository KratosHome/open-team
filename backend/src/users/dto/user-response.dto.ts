import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { ProjectTeamRole } from '../enums/project-team-role.enum';
import { UserRole } from '../enums/user-role.enum';

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
    example: UserRole.USER,
    description: 'Global system role of the user.',
    enum: UserRole,
  })
  role!: UserRole;

  @ApiProperty({
    example: [ProjectTeamRole.PROJECT_MANAGER, ProjectTeamRole.DESIGNER],
    description:
      'Project or team roles that describe what this user can do inside a project.',
    enum: ProjectTeamRole,
    isArray: true,
  })
  projectRoles!: ProjectTeamRole[];

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
    dto.role = user.role;
    dto.projectRoles = user.projectRoles ?? [];
    dto.createdAt = user.createdAt.toISOString();
    dto.updatedAt = user.updatedAt.toISOString();

    return dto;
  }

  static fromEntities(users: User[]): UserResponseDto[] {
    return users.map((user) => UserResponseDto.fromEntity(user));
  }
}
