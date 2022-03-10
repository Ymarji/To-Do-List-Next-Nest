import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './Tasks/Todo.controller';
import { TodoService } from './Tasks/Todo.service';
import { Tasks } from './Tasks/entitie/Todo.entity';
import { Todomodule } from './Tasks/Todo.module';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'user',
      password: 'password123',
      database: 'db_todo',
      entities: [Tasks],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Tasks]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {
  constructor(private connection: Connection) {
    connection.synchronize();
  }
}
