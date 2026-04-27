import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import authConfig from 'src/auth/config/auth.config';
import { User } from './entity/user.entity';
import { HashingProvider } from '../provider/hashing.provider';
import { BcryptProvider } from '../provider/bcrypt.provider';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfig)],
      inject: [authConfig.KEY],
      useFactory: (configuration: ConfigType<typeof authConfig>) => ({
        secret: configuration.secret,
        signOptions: {
          expiresIn: configuration.expiresIn,
        },
      }),
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
