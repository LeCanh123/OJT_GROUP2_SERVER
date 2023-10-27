import { PartialType } from '@nestjs/mapped-types';
import { CreateUser1Dto } from './create-user1.dto';

export class UpdateUser1Dto extends PartialType(CreateUser1Dto) {}
