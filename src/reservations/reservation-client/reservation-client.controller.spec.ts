import { Test, TestingModule } from '@nestjs/testing';
import { ReservationClientController } from './reservation-client.controller';
import { ReservationClientService } from './reservation-client.service';

describe('ReservationClientController', () => {
  let controller: ReservationClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationClientController],
      providers: [ReservationClientService],
    }).compile();

    controller = module.get<ReservationClientController>(ReservationClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
