import {
  Patch,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HttpErrorResponseDto } from '../common/dto/http-error-response.dto';
import { ValidationErrorResponseDto } from '../common/dto/validation-error-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiCreatedResponse({
    description: 'User created successfully.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Request validation failed.',
    type: ValidationErrorResponseDto,
  })
  @ApiConflictResponse({
    description: 'A user with this email already exists.',
    type: HttpErrorResponseDto,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);

    return UserResponseDto.fromEntity(user);
  }

  @ApiOperation({ summary: 'List users' })
  @ApiOkResponse({
    description: 'Users returned successfully.',
    type: UserResponseDto,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll();

    return UserResponseDto.fromEntities(users);
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @ApiParam({
    name: 'id',
    description: 'User identifier.',
    type: Number,
    example: 1,
  })
  @ApiOkResponse({
    description: 'User returned successfully.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The provided id is not a valid integer.',
    type: HttpErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
    type: HttpErrorResponseDto,
  })
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findOne(id);

    return UserResponseDto.fromEntity(user);
  }

  @ApiOperation({ summary: 'Update a user role' })
  @ApiParam({
    name: 'id',
    description: 'User identifier.',
    type: Number,
    example: 1,
  })
  @ApiOkResponse({
    description: 'User role updated successfully.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The provided id or role is invalid.',
    type: ValidationErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
    type: HttpErrorResponseDto,
  })
  @Patch(':id/role')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.updateRole(id, updateUserRoleDto.role);

    return UserResponseDto.fromEntity(user);
  }
}
