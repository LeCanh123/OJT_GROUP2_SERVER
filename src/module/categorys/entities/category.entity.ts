import { Earthquake } from 'src/module/earthquakes/entities/earthquake.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id!: string;

  @Column({ unique: true })
  title!: string;

  @Column({ default: false })
  block: boolean;

  @Column({
    default:
      'https://firebasestorage.googleapis.com/v0/b/test-a6843.appspot.com/o/images%2Fwarning.jpg?alt=media&token=ea5b05ac-a33f-4158-9f15-924c69c56f8b&_gl=1*1fc0nh8*_ga*MTQ3Njc5Mzk2OC4xNjg4MDg5NjI5*_ga_CW55HF8NVT*MTY5NzE3MDU3Ny44OC4xLjE2OTcxNzA1OTUuNDIuMC4w',
  })
  icon: string;

  @Column()
  created_at: string;

  @BeforeInsert()
  setCreateTime() {
    this.created_at = String(Date.now());
  }

  @Column({
    nullable: true,
  })
  updated_at: string;

  // 1 category có nhiều Earthquake
  @OneToMany(() => Earthquake, (earthquake) => earthquake.categorys)
  earthquake!: Earthquake[];
}
