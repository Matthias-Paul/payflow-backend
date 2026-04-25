import { User } from "../entity/user.entity";

export interface RegisterUserResponse {
  data: User;
  message: string;
}