import { AbstractRepository, EntityRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from '../auth/dto/createUser.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MessageError } from '../constants/constants';
import { LoginUserDto } from '../auth/dto/loginUserDto';
import { compare } from 'bcrypt';

@EntityRepository(UserEntity)
export class UserRepository extends AbstractRepository<UserEntity> {
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user: UserEntity = await this.getUserByEmail(createUserDto.email);

    if (user) {
      throw new HttpException(
        MessageError.EMAIL_IS_TAKEN,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser: UserEntity = new UserEntity();
    Object.assign(newUser, createUserDto);
    // Listeners currently only work when attempting to save proper Entity class instances (not plain objects)
    return await this.repository.save(newUser);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOne({
      where: {
        email: email,
      },
    });
  }

  async checkPasswordFromEmail(loginUserDto: LoginUserDto) {
    const user: UserEntity = await this.getUserByEmail(loginUserDto.email);
    const isPassword: boolean = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPassword) {
      throw new HttpException(
        MessageError.INCORRECT_DATA,
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async checkUserByEmail(loginUserDto: LoginUserDto): Promise<CreateUserDto> {
    const user: UserEntity = await this.getUserByEmail(loginUserDto.email);
    if (!user) {
      throw new HttpException(
        MessageError.INCORRECT_DATA,
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.repository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new HttpException(
        MessageError.USER_ID_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
