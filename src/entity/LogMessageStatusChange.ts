import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('LogMessageStatusChange')
export class LogMessageStatusChange {

  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 'MAX',
    name: 'message',
  })
  message: string;

  @Column('datetime', {
    nullable: false,
    name: 'creationDate',
  })
  creationDate: Date;

}
