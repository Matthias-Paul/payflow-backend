import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { RegisterUserResponse } from 'src/interfaces/registerUserResponse.interface';
import { allowAnonymous } from './decorators/allow-anonymous.decorator';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @allowAnonymous()
  @Post('/register')
  register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegisterUserResponse> {
    return this.authService.registerUser(createUserDto);
  }

  @allowAnonymous()
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto): Promise<RegisterUserResponse> {
    return this.authService.loginUser(loginUserDto);
  }
}
