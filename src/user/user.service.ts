import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { HashingProvider } from './provider/hashing.provider';
import { RegisterUserResponse } from './interfaces/registerUserResponse.interface';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(HashingProvider)
    private readonly hashingProvider: HashingProvider,
  ) {}

  public findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  public findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async registerUser( createUserDto: CreateUserDto): Promise<RegisterUserResponse> { 
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const user = this.userRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    const savedUser = await this.userRepository.save(user);

    return {
      data: savedUser,
      message: 'Registration successful.',
    };
  }
}
