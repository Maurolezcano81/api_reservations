import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';


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
}