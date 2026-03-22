import { ApiProperty } from '@nestjs/swagger';

export class HttpErrorResponseDto {
  @ApiProperty({
    example: 409,
    description: 'HTTP status code.',
  })
  statusCode!: number;

  @ApiProperty({
    example: 'User with this email already exists',
    description: 'Human-readable error message.',
  })
  message!: string;

  @ApiProperty({
    example: 'Conflict',
    description: 'NestJS error label.',
  })
  error!: string;
}
