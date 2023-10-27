import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: false })
  email!: string;

  @Column()
  displayName!: string;

  @Column()
  type_login!: number;

  @Column({ nullable: true })
  time!: Date;
}
