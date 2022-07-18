import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { BlogRepository } from './blog.repository';
import { BlogEntity } from './blog.entity';
import { PostsResponseInterface } from './interface/postResponseInterface';
import { EditPostDto } from './dto/editPost.dto';
import { MessageError } from '../constants/constants';
import { PromiseOptional } from '../interfacesAndTypes/optional.interface';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}
  async createPost(
    currentUser: UserEntity,
    createPostDto: CreatePostDto,
  ): Promise<void> {
    return await this.blogRepository.createPost(currentUser, createPostDto);
  }

  async findAll(filterObj?): Promise<PostsResponseInterface> {
    return this.blogRepository.findAll(filterObj);
  }

  async getBlogBySlug(slug: string): PromiseOptional<BlogEntity> {
    return this.blogRepository.findBySlug(slug);
  }

  async editPost(
    user: UserEntity,
    editPostDto: EditPostDto,
  ): PromiseOptional<void> {
    const existPostData: BlogEntity = await this.getBlogBySlug(
      editPostDto.slug,
    );
    if (existPostData.author.id !== user.id) {
      throw new HttpException(MessageError.ACCESS_DENIED, HttpStatus.FORBIDDEN);
    }

    return this.blogRepository.editPost(user, editPostDto);
  }

  async deletePost(user: UserEntity, slug: string): PromiseOptional<void> {
    const existPostData: BlogEntity = await this.getBlogBySlug(slug);
    if (existPostData.author.id !== user.id) {
      throw new HttpException(MessageError.ACCESS_DENIED, HttpStatus.FORBIDDEN);
    }

    return this.blogRepository.deletePost(user, slug);
  }
}
