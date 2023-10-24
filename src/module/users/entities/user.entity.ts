import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


export enum UserType {
  Google = 'google',
  Facebook = 'facebook',
}



@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: false })
  email!: string;

  @Column({ nullable: true })
  facebookid!: String;

  @Column({ nullable: true })
  googleid!: String;

  @Column({ nullable: true, type: 'enum', enum: UserType })
  type1!: UserType;

  @Column({ nullable: true })
  time!: Date;
}
