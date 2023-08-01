import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as net from 'net';
import { TcpServer } from './modules/tcp/tcp.server';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    TcpServer
  ],
})
export class AppModule { }
