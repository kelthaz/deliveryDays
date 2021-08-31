import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {

  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    name: "identificationType",
    nullable: false,
    length: 8
  })
  identificationType: string;

  @Column({
    name: "identification",
    nullable: false,
    length: 32
  })

  identification: string;

  @Column({
    name: "provider",
    nullable: false,
    length: 16
  })
  provider: string;

  @Column({
    name: "orderNumber",
    nullable: false,
    length: 64
  })
  orderNumber: string;

  @Column({
    name: "status",
    nullable: false,
    length: 1
  })
  status: string;

  @Column({
    name: "payload",
    nullable: false,
    length: 4000
  })
  payload: string;

  @Column({
    name: "payloadUpdate",
    nullable: true,
    length: 4000
  })
  payloadUpdate: string;

  @Column({
    name: "creationDate",
    nullable: false,
  })
  creationDate: Date;

  @Column({
    name: "lastUpdate",
    nullable: false,
  })
  lastUpdate: Date;
}
