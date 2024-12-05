import { Test, TestingModule } from '@nestjs/testing';
import { ReservationClientService } from './reservation-client.service';

describe('ReservationClientService', () => {
  let service: ReservationClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationClientService],
    }).compile();

    service = module.get<ReservationClientService>(ReservationClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
