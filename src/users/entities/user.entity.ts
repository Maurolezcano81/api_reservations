import { Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export class User {
    

    @PrimaryGeneratedColumn()
    id_user: number

    @Column()
    username_user: string



}
