import { User } from '../user/entity/user.entity';

export interface RegisterUserResponse {
  data: User;
  token: string;
  message: string;
}
