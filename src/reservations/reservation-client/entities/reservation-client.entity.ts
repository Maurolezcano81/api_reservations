import { TypeReservation } from "src/admin/type_reservation/entities/type_reservation.entity";
import { People } from "src/entity/entities/entity.entity";
import { HoursAttention } from "src/itinerate/hours-attention/entities/hours-attention.entity";
import { Service } from "src/sale_of_point/services/entities/service.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReservationClient {

    @PrimaryGeneratedColumn()
    id_reservation: number

    @ManyToOne(() => People, (People) => People.client_fk,
        { eager: true }
    )
    client_fk: People

    @Column({ type: "time" })
    hour_start: string

    @Column({ type: "time" })
    hour_end: string

    @ManyToOne(() => Service, (Service) => Service.service_fk,
        { eager: true }
    )
    service_fk: Service

    @ManyToOne(() => TypeReservation, (TypeReservation) => TypeReservation.tr_fk,
        { eager: true }
    )
    tr_fk: TypeReservation

    @ManyToOne(() => HoursAttention, (HoursAttention) => HoursAttention.ha_fk,
        { eager: true }
    )
    ha_fk: HoursAttention

    @Column({ type: "date" })
    reservated_at: Date
}
