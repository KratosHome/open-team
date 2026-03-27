import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorResponseDto {
  @ApiProperty({
    example: 400,
    description: 'HTTP status code.',
  })
  statusCode!: number;

  @ApiProperty({
    example: [
      'email must be an email',
      'password must be longer than or equal to 6 characters',
    ],
    description: 'Validation messages returned by the global ValidationPipe.',
    type: [String],
  })
  message!: string[];

  @ApiProperty({
    example: 'Bad Request',
    description: 'NestJS error label.',
  })
  error!: string;
}
