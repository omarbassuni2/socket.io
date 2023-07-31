import { Module } from '@nestjs/common';
import { SocketIoGateway } from './gateway';

@Module({
    providers: [SocketIoGateway]
})
export class SocketioModule { }
