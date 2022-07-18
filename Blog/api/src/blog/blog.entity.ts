import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'blog' })
export class BlogEntity {
  @ApiProperty({ example: 2 })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'Top title' })
  @Column('varchar', { length: 100 })
  title: string;

  @ApiProperty({ example: 'test-qu6kke' })
  @Column('varchar', { unique: true })
  slug: string;

  @ApiProperty({ example: 'Top text' })
  @Column('varchar', { length: 1000 })
  text: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/agroex-backend/image/upload/v1656319454/rs2k74crvmzu872fm5sh.webp',
  })
  @Column('varchar')
  media: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.blog, { eager: true })
  @JoinColumn({ referencedColumnName: 'id' })
  author: UserEntity;
}
