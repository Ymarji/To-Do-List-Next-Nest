import { Injectable, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from 'typeorm';
import { Tasks } from "./entitie/Todo.entity";
import { Todo } from "./interfaces/task.interface"


@Injectable()
export class TodoService{
    constructor(@InjectRepository(Tasks) private taskRepo:Repository<Tasks>) {}

    public async getList(): Promise<Tasks []>{
        let res = await this.taskRepo.find({
            order: {
                id: "ASC"
            }
        })
        return res;
    }

    public async addToList(Todo: Todo): Promise<Tasks>  {
        let Item = new Tasks();
        Item.Task = Todo.Task;
        let res = await this.taskRepo.save(Item);
        console.log("Task has been saved");
        return res;
    }

    public async updateOne(Todo: Todo){
        // let res = await this.taskRepo.findOne(Todo.id);
        // // console.log(Todo.id);
        // if (typeof(res) !== "undefined"){
        //     res.Stat = Todo.Stat;
        //     await this.taskRepo.save(res);
        // }
        await getConnection()
            .createQueryBuilder()
            .update(Tasks)
            .set({
                Stat: Todo.Stat
            })
            .where("id = :id", { id: Todo.id})
            .execute();
    }

    public async clearAll() {
        let res = await this.getList();
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Tasks)
            .execute();
    }

    public async removeOne(id: number){
        let res = await this.taskRepo.findOne(id);
        if (typeof(res) !== "undefined")
            await this.taskRepo.remove(res);
    }
}