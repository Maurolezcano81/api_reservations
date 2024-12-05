import { HoursAttention } from "src/itinerate/hours-attention/entities/hours-attention.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Day {

    @PrimaryGeneratedColumn()
    id_day: number

    @Column()
    name_day: string

    @Column({ default: true })
    status: boolean

    @OneToMany(() => HoursAttention, (HoursAttention) => HoursAttention.day_fk,
        {
            eager: true
        }
    )
    ha_fk: HoursAttention[];
}
