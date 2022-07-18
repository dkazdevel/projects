import {
  AbstractRepository,
  EntityRepository,
  getRepository,
  SelectQueryBuilder,
} from 'typeorm';
import { BlogEntity } from './blog.entity';
import { createSlug } from '../helper/helper';
import { PostsResponseInterface } from './interface/postResponseInterface';
import * as _ from 'lodash';
import { Dictionary } from 'lodash';
import { UserEntity } from '../user/user.entity';
import { EditPostDto } from './dto/editPost.dto';
import { PromiseOptional } from '../interfacesAndTypes/optional.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MessageError } from '../constants/constants';

@EntityRepository(BlogEntity)
export class BlogRepository extends AbstractRepository<BlogEntity> {
  async createPost(user, createPostDto): Promise<void> {
    const blog: BlogEntity = new BlogEntity();
    Object.assign(blog, createPostDto);
    blog.slug = createSlug(createPostDto.title);
    blog.author = user;

    await this.repository.save(blog);
  }

  async findAll(filterObj?): Promise<PostsResponseInterface> {
    const filterOptions: Dictionary<any> = _.omitBy(filterObj, _.isNil);

    const queryBuilder: SelectQueryBuilder<BlogEntity> = getRepository(
      BlogEntity,
    )
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.author', 'author')

      .addOrderBy('blog.createAt', 'DESC');

    if (_.has(filterOptions, 'user')) {
      queryBuilder.andWhere('author.id = :author', {
        author: filterOptions.user,
      });
    }

    const posts: BlogEntity[] = await queryBuilder.getMany();

    const postsCount: number = await queryBuilder.getCount();

    return {
      posts,
      postsCount,
    };
  }

  async findBySlug(slug: string): PromiseOptional<BlogEntity> {
    const blog = await this.repository.findOne({
      where: { slug: slug },
      relations: ['author'],
    });

    if (!blog) {
      throw new HttpException(
        MessageError.ADVERTISEMENT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return blog;
  }

  async editPost(user: UserEntity, editPostDto: EditPostDto): Promise<void> {
    await this.repository.update(
      {
        slug: editPostDto.slug,
      },
      {
        ..._.omit(editPostDto, 'slug'),
      },
    );
  }

  async deletePost(user: UserEntity, slug: string): PromiseOptional<void> {
    await this.repository.delete({ slug: slug });
  }
}
