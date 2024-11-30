import { Test, TestingModule } from '@nestjs/testing';
import { TypeReservationController } from './type_reservation.controller';
import { TypeReservationService } from './type_reservation.service';

describe('TypeReservationController', () => {
  let controller: TypeReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeReservationController],
      providers: [TypeReservationService],
    }).compile();

    controller = module.get<TypeReservationController>(TypeReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
