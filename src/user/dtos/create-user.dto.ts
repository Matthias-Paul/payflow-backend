
import { IsString, IsEmail, IsNotEmpty, IsDateString, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  address1: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  state: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  postalCode: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  ssn: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  dwollaCustomerUrl?: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  dwollaCustomerId?: string;
}
