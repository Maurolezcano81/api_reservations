import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id_role: number

    @Column()
    name_role: string

    @Column()
    status: boolean

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @CreateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @OneToMany( () => User, (user) => user.role_fk)
    user_fk: User
    
}
