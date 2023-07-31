import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketioModule } from './modules/gateway/gateway.module';

@Module({
  imports: [SocketioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
