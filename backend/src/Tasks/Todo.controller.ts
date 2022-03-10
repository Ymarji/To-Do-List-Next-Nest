import { Controller, Get, Post, Body, Delete, Param, HttpCode, Put } from "@nestjs/common";
import { TodoService } from "./Todo.service";
import { Todo } from "./interfaces/task.interface"
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
@Controller()
export class TodoController{
    constructor(private readonly appService: TodoService) {}

    @Get()
    async getList() {
        return await this.appService.getList();
    }

    @Put('/put')
    async updateOne(@Body() Do: Todo) {
        return await this.appService.updateOne(Do);
    }

    @Post()
    async addToList(@Body() Do: Todo){
        return await this.appService.addToList(Do);
    }

    @Delete()
    async clearList() {
        return await this.appService.clearAll();
    }

    @Post(':id')
    async removeOne(@Param() id: number){
        if (id)
            return await this.appService.removeOne(id);
    }
}