import { Test, TestingModule } from '@nestjs/testing';
import { User1Controller } from './user1.controller';
import { User1Service } from './user1.service';

describe('User1Controller', () => {
  let controller: User1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [User1Controller],
      providers: [User1Service],
    }).compile();

    controller = module.get<User1Controller>(User1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
