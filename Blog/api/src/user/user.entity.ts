import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { numToEncode } from '../constants/constants';
import { BlogEntity } from '../blog/blog.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'anton@gmail.com' })
  @Column('varchar', { unique: true })
  email: string;

  @ApiProperty({ example: 'Anton' })
  @Column('varchar', { length: 50 })
  username: string;

  @ApiProperty()
  @Column('varchar')
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, numToEncode);
  }

  @OneToMany(() => BlogEntity, (blog) => blog.author)
  blog: BlogEntity[];
}
