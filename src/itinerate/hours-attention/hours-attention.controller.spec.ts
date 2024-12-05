import { Test, TestingModule } from '@nestjs/testing';
import { HoursAttentionController } from './hours-attention.controller';
import { HoursAttentionService } from './hours-attention.service';

describe('HoursAttentionController', () => {
  let controller: HoursAttentionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoursAttentionController],
      providers: [HoursAttentionService],
    }).compile();

    controller = module.get<HoursAttentionController>(HoursAttentionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
