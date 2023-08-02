import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TcpToSocketioModule } from './modules/tcp-to-socketio/tcp-to-socketio.module';
// import { TcpServer } from './modules/tcp-to-socketio/tcp.server';

@Module({
  imports: [TcpToSocketioModule],
  controllers: [AppController],
  providers: [
    AppService,
    // TcpServer
  ],
})
export class AppModule { }
