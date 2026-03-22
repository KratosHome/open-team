import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

type QueryErrorWithCode = {
  code?: string;
  driverError?: {
    code?: string;
  };
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (this.isDuplicateEmailError(error)) {
        throw new ConflictException('User with this email already exists');
      }

      throw error;
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  private isDuplicateEmailError(error: unknown): boolean {
    if (typeof error !== 'object' || error === null) {
      return false;
    }

    const queryError = error as QueryErrorWithCode;
    return (
      queryError.driverError?.code === '23505' || queryError.code === '23505'
    );
  }
}
