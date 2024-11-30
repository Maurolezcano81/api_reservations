import { Test, TestingModule } from '@nestjs/testing';
import { TypeReservationService } from './type_reservation.service';

describe('TypeReservationService', () => {
  let service: TypeReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeReservationService],
    }).compile();

    service = module.get<TypeReservationService>(TypeReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
