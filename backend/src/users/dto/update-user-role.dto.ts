import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class UpdateUserRoleDto {
  @ApiProperty({
    example: UserRole.ADMIN,
    description: 'New global system role for the user.',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  role!: UserRole;
}
