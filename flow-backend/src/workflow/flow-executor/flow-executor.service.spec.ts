import { Test, TestingModule } from '@nestjs/testing';
import { FlowExecutorService } from './flow-executor.service';

describe('FlowExecutorService', () => {
  let service: FlowExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlowExecutorService],
    }).compile();

    service = module.get<FlowExecutorService>(FlowExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
