import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditPostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Post title',
    minLength: 2,
    maxLength: 20,
  })
  @Length(2, 100)
  readonly title: string;

  @ApiProperty({
    example: 'Message text',
    description: 'Message text',
    minLength: 2,
    maxLength: 300,
  })
  @IsNotEmpty()
  @Length(2, 1000)
  text: string;

  media: string;

  @ApiProperty({
    example: 'tepost-with-video-x6luaaxt',
    description: 'slug',
  })
  @IsNotEmpty()
  slug: string;
}
