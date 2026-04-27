import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import authConfig from './config/auth.config';
import { AuthorizeGuard } from './guards/authorized.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthorizeGuard,
    },
  ],
  imports: [
    UserModule,
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
})
export class AuthModule {}
