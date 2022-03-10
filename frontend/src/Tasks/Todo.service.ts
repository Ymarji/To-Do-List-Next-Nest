import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, createConnection, Repository } from 'typeorm';
import { Tasks } from "./entitie/Todo.entity";
import { Todo } from "./interfaces/task.interface"


@Injectable()
export class TodoService{
    constructor(@InjectRepository(Tasks) private taskRepo:Repository<Tasks>) {}

    public getList(): Promise<Tasks []>{
        return this.taskRepo.find();
    }

    public async addToList(Todo: Todo): Promise<Tasks>  {
        let Item = new Tasks();
        Item.Task = Todo.Task;
        let res = await this.taskRepo.save(Item);
        console.log("Photo has been saved");
        return res;
    }
}