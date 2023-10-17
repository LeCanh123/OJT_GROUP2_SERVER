import { Earthquake } from "src/module/earthquakes/entities/earthquake.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column({ unique: true })
    type!: string 

    @Column({ unique: false })
    block!: string 

    @Column({ unique: false })
    image!: string 

    // 1 category có nhiều Earthquake
    @OneToMany(() => Earthquake, (earthquake) => earthquake.categorys)
    earthquake!: Earthquake[]
}

