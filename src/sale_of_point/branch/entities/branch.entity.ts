import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Branch {
    @PrimaryGeneratedColumn()
    id_branch: number

    @Column()
    name_branch: string

    @Column()
    login_branch: string

    @Column()
    logo_branch: string

    @Column()
    fb_branch: string

    @Column()
    ig_branch: string

    @Column()
    email_branch: string

    @Column()
    tel_branch: string

    @OneToOne(() => User, (User) => User.id_user,
        { eager: true }
    )
    @JoinColumn()
    supervisor: User

}
