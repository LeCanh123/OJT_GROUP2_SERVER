import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: false })
  username!: string;

  @Column({ nullable: true })
  password!: String;

}
