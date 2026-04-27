import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import authConfig from 'src/auth/config/auth.config';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { HashingProvider } from '../provider/hashing.provider';
import { RegisterUserResponse } from '../interfaces/registerUserResponse.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(HashingProvider)
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  public findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  public findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async registerUser(
    createUserDto: CreateUserDto,
  ): Promise<RegisterUserResponse> {
    try {
      const existingUser = await this.findByEmail(createUserDto.email);

      if (existingUser) {
        throw new BadRequestException('User with this email already exists');
      }

      const user = this.userRepository.create({
        ...createUserDto,
        password: await this.hashingProvider.hashPassword(
          createUserDto.password,
        ),
      });

      const savedUser = await this.userRepository.save(user);

      const token = await this.jwtService.signAsync(
        {
          sub: savedUser.id,
          email: savedUser.email,
        },
        {
          secret: this.authConfiguration.secret,
          expiresIn: this.authConfiguration.expiresIn,
        },
      );

      return {
        data: savedUser,
        token,
        message: 'Registration successful.',
      };
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to register user');
    }
  }
}
