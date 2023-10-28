import { Collection, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ unique: true})
    userName: string;

    @Column()
    password: string;
    
}
