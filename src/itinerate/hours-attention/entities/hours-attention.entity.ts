import { Day } from "src/itinerate/days/entities/day.entity";
import { ReservationClient } from "src/reservations/reservation-client/entities/reservation-client.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class HoursAttention {

    @PrimaryGeneratedColumn()
    id_ha: number

    @Column({ type: "time" })
    start_ha: string

    @Column({ type: "time" })
    end_ha: string

    @Column({ default: true })
    status: boolean

    @ManyToOne(() => Day, (Day) => Day.ha_fk)
    day_fk: Day

    @OneToMany(() => ReservationClient, (ReservationClient) => ReservationClient.ha_fk)
    ha_fk: number
}
