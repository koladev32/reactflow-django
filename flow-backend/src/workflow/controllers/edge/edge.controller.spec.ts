import { Test, TestingModule } from '@nestjs/testing';
import { EdgeController } from './edge.controller';

describe('EdgeController', () => {
  let controller: EdgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EdgeController],
    }).compile();

    controller = module.get<EdgeController>(EdgeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
