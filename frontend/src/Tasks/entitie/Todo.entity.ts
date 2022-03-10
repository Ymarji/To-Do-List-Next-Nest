import { Entity, Column , PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tasks{
    @PrimaryGeneratedColumn()
        id: number;
    @Column()
        Task: string;
}