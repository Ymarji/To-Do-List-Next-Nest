import { Entity, Column , PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tasks{
    @PrimaryGeneratedColumn({type: 'int'})
        id: string;
    @Column()
        Task: string;
    @Column('boolean', {default: false})
        Stat: Boolean;
}