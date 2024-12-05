import { ReservationClient } from 'src/reservations/reservation-client/entities/reservation-client.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, OneToOne } from 'typeorm';


@Entity()
export class TypeReservation {
    @PrimaryGeneratedColumn()
    id_tr: number;

    @Column()
    name_tr: string

    @Column({ default: true })
    status: boolean

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @CreateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @OneToMany(() => ReservationClient, (ReservationClient) => ReservationClient.tr_fk)
    tr_fk: ReservationClient[]
}