
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entitie/Todo.entity';
import { TodoController } from './Todo.controller';
import { TodoService } from './Todo.service';


@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class Todomodule {}
