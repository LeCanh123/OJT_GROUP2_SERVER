import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


export enum UserType {
  Google = 'google',
  Facebook = 'facebook',
}



@Entity()
export class User1 {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: false })
  email!: string;

  @Column({ unique: false })
  name: string;

  @Column({ nullable: true })
  facebookid!: String;

  @Column({ nullable: true })
  googleid!: String;

  @Column({ nullable: true, type: 'enum', enum: UserType })
  type!: UserType;

  @Column({ nullable: true })
  time!: Date;
}
