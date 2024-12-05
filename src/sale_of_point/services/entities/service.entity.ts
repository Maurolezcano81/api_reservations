import { ReservationClient } from "src/reservations/reservation-client/entities/reservation-client.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service {

    @PrimaryGeneratedColumn()
    id_service: number

    @Column()
    name_service: string

    @Column()
    price_service: number

    @Column()
    estimated_time_service: number

    @Column({ default: true })
    status: boolean

    @OneToMany(() => ReservationClient, (ReservationClient) => ReservationClient.service_fk)
    service_fk: ReservationClient

}
