import { Map } from "src/module/maps/entities/map.entity";
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

    // 1 category có nhiều map
    @OneToMany(() => Map, (map) => map.categorys)
    maps!: Map[]
}

