import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn("increment")
    id:number

    @Column()
    file:string

    @Column()
    title:string

    @Column()
    message:string

    @CreateDateColumn()
    create_at:Date
}
