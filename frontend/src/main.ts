import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as http from "http";
import { AppModule } from './app.module';
import { NextApiHandler } from 'next'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();

export module Backend {

  let app: INestApplication;

  export async function getApp(){
    if (!app){
      app = await NestFactory.create(AppModule, {bodyParser: false});
      app.setGlobalPrefix('api');
      await app.init();
    }
    return app;
  }

  export async function getListener() {
    const app =  await getApp();
    const server: http.Server = app.getHttpServer();
    const [listner] = server.listeners("request") as NextApiHandler[];
    return listner;
  }
}
