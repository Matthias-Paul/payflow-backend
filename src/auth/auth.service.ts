import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { RegisterUserResponse } from 'src/interfaces/registerUserResponse.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public registerUser(
    createUserDto: CreateUserDto,
  ): Promise<RegisterUserResponse> {
    return this.userService.registerUser(createUserDto);
  }
}
