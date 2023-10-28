import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/module/users/entities/user.entity';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOrCreateUser(details: UserDetails) {
    const user = await this.userRepository.findOneBy({
      oauth_id: details.oauth_id,
    });

    if (user) return user;

    const newUser = await this.userRepository.create(details);

    return this.userRepository.save(newUser);
  }

  async findUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
