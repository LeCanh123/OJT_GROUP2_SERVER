import { Category } from 'src/module/categorys/entities/category.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Earthquake {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column()
  lat!: string;

  @Column()
  lng!: string;

  @Column()
  level: string;

  @Column() //tên tỉnh thành phố
  place!: string;

  @Column() //phạm vi ảnh hưởng
  size!: number;

  @Column({ type: 'timestamp' }) //thời gian bắt đầu sảy ra động đất
  time_start: Date;

  @Column({
    default: Date.now(),
  }) //Thời gian tạo trên hệ thống
  created_at: string;

  @BeforeInsert()
  setCreateTime() {
    this.created_at = String(Date.now());
  }

  @Column({
    nullable: true,
  })
  updated_at: string;

  @Column({
    nullable: true,
  })
  time_notification: Date;

  @Column({ default: false })
  block: boolean;

  @Column({
    nullable: false,
  })
  categorysId: string;

  //nhiều earthquake liên kết 1 category
  @ManyToOne(() => Category, (category) => category.earthquake)
  categorys: Category[];
}
