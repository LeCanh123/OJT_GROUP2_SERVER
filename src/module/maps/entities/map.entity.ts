import { Category } from "src/module/categorys/entities/category.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Map {

    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column({ unique: false })
    locationx!: string 

    @Column({ unique: false })
    locationy!: string 

    @Column({ unique: false })
    name!: string 

    @Column({ unique: false })
    block!: string 

    @Column({ unique: false })
    size!: number 

    @Column({ nullable: true }) //thời gian đăng
    time!: Date 

    @Column({ nullable: true }) //tên tỉnh thành phố
    country!: string 

    //nhiều map liên kết 1 category
    @ManyToOne(() => Category, (category) => category.maps)
    categorys!: Category[]

    
}
