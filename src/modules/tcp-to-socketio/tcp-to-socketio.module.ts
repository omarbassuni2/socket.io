import { Module } from '@nestjs/common';
import { TcpToSocketioService } from './tcp-to-socketio.service';
import { SocketIOServer } from './socketio.server';
import { TcpServer } from './tcp.server';

@Module({
  imports: [],
  providers: [TcpToSocketioService, SocketIOServer, TcpServer],
  exports: [TcpToSocketioService]
})
export class TcpToSocketioModule { }
