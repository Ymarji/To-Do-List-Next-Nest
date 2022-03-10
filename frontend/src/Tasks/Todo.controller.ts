import { Controller, Get, Post, Body } from "@nestjs/common";
import { TodoService } from "./Todo.service";
import { Todo } from "./interfaces/task.interface"
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
@Controller()
export class TodoController{
    constructor(private readonly appService: TodoService) {}

    @Get()
    async getList() {
        return this.appService.getList();
    }

    @Post()
    addToList(@Body() Do: Todo){
        return this.appService.addToList(Do);
    }
}