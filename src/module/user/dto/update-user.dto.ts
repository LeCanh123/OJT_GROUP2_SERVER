import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUser1Dto extends PartialType(CreateUserDto) {}
