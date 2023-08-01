import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as net from 'net';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TcpServerService',
      useFactory: () => {
        const server = net.createServer((socket) => {
          socket.write('From NestJs TcpServerService\r\n');

          let receivedData = '';

          socket.on('data', (data) => {
            receivedData += data.toString();
            if (receivedData.includes('\n')) {
              const responseMessage = `${receivedData.trim()} from server\r\n`;
              socket.write(responseMessage);
              receivedData = '';
            }
          });
        });

        server.listen(9050, '127.0.0.1');

        return server;
      },
    },
  ],
})
export class AppModule { }
