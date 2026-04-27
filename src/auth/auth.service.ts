import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { RegisterUserResponse } from 'src/interfaces/registerUserResponse.interface';
import { UserService } from 'src/user/user.service';
import { HashingProvider } from 'src/provider/hashing.provider';
import authConfig from './config/auth.config';
import type { ConfigType } from '@nestjs/config';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  public registerUser(
    createUserDto: CreateUserDto,
  ): Promise<RegisterUserResponse> {
    return this.userService.registerUser(createUserDto);
  }

  public async loginUser(
    loginUserDto: LoginUserDto,
  ): Promise<RegisterUserResponse> {
    try {
      const user = await this.userService.findByEmail(loginUserDto.email);

      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isPasswordValid = await this.hashingProvider.comparePassword(
        loginUserDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const token = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        {
          secret: this.authConfiguration.secret,
          expiresIn: this.authConfiguration.expiresIn,
        },
      );

      return {
        data: user,
        token,
        message: 'Login successful.',
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to login user');
    }
  }
}
