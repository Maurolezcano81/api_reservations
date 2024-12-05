import { Test, TestingModule } from '@nestjs/testing';
import { HoursAttentionService } from './hours-attention.service';

describe('HoursAttentionService', () => {
  let service: HoursAttentionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HoursAttentionService],
    }).compile();

    service = module.get<HoursAttentionService>(HoursAttentionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
