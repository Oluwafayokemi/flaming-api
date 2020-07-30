import { IsString } from 'class-validator';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  password: string;
  
  phone: string;
 
  @IsNotEmpty()
  country: string;
 
  state: string;
 
  views: string;
}
