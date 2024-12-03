import { Column, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    principal_color: string
}
