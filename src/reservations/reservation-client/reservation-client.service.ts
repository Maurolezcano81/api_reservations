import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReservationClientDto } from './dto/create-reservation-client.dto';
import { UpdateReservationClientDto } from './dto/update-reservation-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ReservationClient } from './entities/reservation-client.entity';
import { People } from 'src/entity/entities/entity.entity';
import { Service } from 'src/sale_of_point/services/entities/service.entity';
import { HoursAttention } from 'src/itinerate/hours-attention/entities/hours-attention.entity';
import { TypeReservation } from 'src/admin/type_reservation/entities/type_reservation.entity';

@Injectable()
export class ReservationClientService {

  constructor(
    @InjectRepository(ReservationClient)
    private readonly reservationClientRepository: Repository<ReservationClient>,

    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(TypeReservation)
    private readonly typeReservationRepository: Repository<TypeReservation>,

    @InjectRepository(HoursAttention)
    private readonly hoursAttentionRepository: Repository<HoursAttention>,
  ) { }

  async create(createReservationClientDto: CreateReservationClientDto, client_fk: number) {
    const { service_fk, tr_fk, hour_start, reservated_at } = createReservationClientDto;

    if (!client_fk || !service_fk || !tr_fk || !hour_start || !reservated_at) {
      throw new HttpException("Todos los campos obligatorios deben estar presentes.", HttpStatus.BAD_REQUEST);
    }

    const client = await this.peopleRepository.findOne({ where: { id_entity: client_fk } });
    if (!client) {
      throw new HttpException("El cliente especificado no existe.", HttpStatus.BAD_REQUEST);
    }

    const service = await this.serviceRepository.findOne({ where: { id_service: service_fk } });
    if (!service) {
      throw new HttpException("El servicio especificado no existe.", HttpStatus.BAD_REQUEST);
    }

    const day_formatted = new Date(reservated_at);

    const hoursAttention = await this.hoursAttentionRepository.findOne({
      where: { ha_fk: service_fk, day_fk: { id_day: day_formatted.getDay() } },
    });

    if (!hoursAttention) {
      throw new HttpException("No hay horario laboral definido para este día.", HttpStatus.BAD_REQUEST);
    }

    if (hour_start <= hoursAttention.start_ha || hour_start >= hoursAttention.end_ha) {
      throw new HttpException("La hora de inicio está fuera del horario laboral permitido.", HttpStatus.BAD_REQUEST);
    }

    // if (hourEnd <= hoursAttention.start_ha || hourEnd >= hoursAttention.end_ha) {
    //   throw new HttpException("La hora de inicio está fuera del horario laboral permitido.", HttpStatus.BAD_REQUEST);
    // }

    const existingReservation = await this.reservationClientRepository.findOne({
      where: {
        service_fk: { service_fk: service.service_fk },
        reservated_at,
        tr_fk: { id_tr: 2 },
        hour_start: Between(hour_start, this.addMinutesToTime(hour_start, service.estimated_time_service)),
      },
    });

    if (existingReservation) {
      throw new HttpException("El horario ya está reservado.", HttpStatus.BAD_REQUEST);
    }

    const hourEnd = this.addMinutesToTime(hour_start, service.estimated_time_service);

    if (hourEnd >= hoursAttention.end_ha) {
      throw new HttpException("La hora de finalización está fuera del horario laboral permitido, seleccione un dia distinto, o un horario acorde al estimado del servicio.", HttpStatus.BAD_REQUEST);
    }

    const instance = this.reservationClientRepository.create({
      ...createReservationClientDto,
      hour_end: hourEnd,
      client_fk: { id_entity: client_fk },
      service_fk: { id_service: service_fk },
      tr_fk: { id_tr: tr_fk },
    });

    const create = await this.reservationClientRepository.save(instance);

    return {
      create,
      message: "Reserva creada exitosamente",
    };
  }

  addMinutesToTime(time: string, minutes: number): string {
    const [hours, mins] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
  }

  async findAll() {
    const [data, total] = await this.reservationClientRepository.findAndCount({
      order: {
        hour_start: 'ASC'
      }
    });


    return {
      data,
      total,
      message: "Obtenido exitosamente"
    }
  }

  async findOne(id: number) {
    const data = await this.reservationClientRepository.findOne(
      {
        where: { id_reservation: id }
      }
    )
    return data;
  }

  async update(id: number, updateReservationClientDto: UpdateReservationClientDto) {

    console.log(updateReservationClientDto)

    const update = await this.reservationClientRepository.update({
      id_reservation: id
    }, {
      tr_fk: { id_tr: updateReservationClientDto.tr_fk }
    })

    console.log(update)

    return {
      update,
      message: "Reserva actualizada exitosamente"
    }

  }

  async findAllPendings() {
    const [data, total] = await this.reservationClientRepository.findAndCount({
      where:
        { tr_fk: { id_tr: 4 } },
      order:
      {
        reservated_at: "ASC"
      }

    })

    return {
      data,
      total
    }
  }

  async findAllReservationsByDay(day: Date) {
    const [data, total] = await this.reservationClientRepository.findAndCount({
      where:
      {
        tr_fk: { id_tr: 2 },
        reservated_at: day
      },
      order:
      {
        hour_start: "ASC"
      }
    })

    return {
      data,
      total
    }
  }

  async remove(id: number) {
    const remove = await this.reservationClientRepository.delete({
      id_reservation: id
    })
    return {
      remove,
      message: "Reservada eliminada exitosamente"
    }
  }
}
