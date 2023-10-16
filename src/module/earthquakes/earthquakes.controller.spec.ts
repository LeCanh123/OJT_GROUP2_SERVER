import { Test, TestingModule } from '@nestjs/testing';
import { EarthquakesController } from './earthquakes.controller';
import { EarthquakesService } from './earthquakes.service';

describe('EarthquakesController', () => {
  let controller: EarthquakesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EarthquakesController],
      providers: [EarthquakesService],
    }).compile();

    controller = module.get<EarthquakesController>(EarthquakesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
