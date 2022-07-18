import { BlogEntity } from '../blog.entity';

export interface PostsResponseInterface {
  posts: BlogEntity[];
  postsCount: number;
}
