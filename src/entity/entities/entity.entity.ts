import { User } from "src/users/entities/user.entity";
import { Column, JoinColumn, Entity, OneToOne, PrimaryGeneratedColumn, JoinTable } from "typeorm";

@Entity()
export class People {

    @PrimaryGeneratedColumn()
    id_entity: number

    @Column()
    name_entity: string

    @Column()
    lastname_entity: string

    @Column()
    number_entity: string

    @Column()
    email_entity: string

    @OneToOne(() => User, (User) => User.id_user
    )
    @JoinColumn()
    user_fk: User

}
