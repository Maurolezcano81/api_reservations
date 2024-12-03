import { Role } from "src/admin/role/entities/role.entity";
import { People } from "src/entity/entities/entity.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id_user: number

    @Column()
    username_user: string

    @Column()
    pwd_user: string

    @Column({ default: true })
    status: boolean

    @ManyToOne(() => Role, (role) => role.user_fk,
        { eager: true }
    )
    role_fk: Role

    @OneToOne(() => People, (people) => people.user_fk,
        { eager: true, cascade: ['remove'] },
    )
    people: People;
}
