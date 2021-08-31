import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('statusTraceability')
export class StatusTraceability {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({    
        name: "status",
        nullable: false,
        length: 1
    })
    status: string
    
    @Column({
        name: "idOrder",
        nullable: false
    })
    idOrder: number

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
