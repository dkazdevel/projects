import { UserEntity } from '../user/user.entity';
import { UserResponseInterface } from '../user/interfacesAndTypes/userResponse.interface';

export const userForResponse = (
  user: UserEntity,
  token: string,
): UserResponseInterface => ({
  user: {
    id: user.id,
    username: user.username,
    email: user.email,
    token: token,
    blog: user.blog,
  },
});
