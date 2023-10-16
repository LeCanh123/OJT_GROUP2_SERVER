import { Category } from "src/module/categorys/entities/category.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Earthquake {

    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column({ unique: false })
    name!: string 


    @Column({ unique: false })
    lat!: string 

    @Column({ unique: false })
    lng!: string 

    @Column({ unique: false })
    level!: string 

    
    @Column({ unique: false }) //tên tỉnh thành phố
    place!: string 

    @Column({ unique: false }) //phạm vi ảnh hưởng
    size!: number 

    @Column({ nullable: true }) //thời gian bắt đầu sảy ra động đất
    time_start!: Date 

    @Column({ nullable: true }) //Thời gian kết thúc động đất
    time_end!: Date 

    @Column({ nullable: true }) //Thời gian tạo trên hệ thống
    created_at!: Date 

    @Column({ nullable: true }) //Thời gian thông báo
    time_notification!: Date 

    @Column({ unique: false })
    block!: string 


    //nhiều earthquake liên kết 1 category
    @ManyToOne(() => Category, (category) => category.earthquake)
    categorys!: Category[]

    
}
