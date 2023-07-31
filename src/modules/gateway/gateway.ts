import { OnModuleInit } from "@nestjs/common";
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway(9050)
export class SocketIoGateway implements OnModuleInit {

    @WebSocketServer()
    private server: any;

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id, ': Connected')
        })
    }

    @SubscribeMessage('message')
    handleMessage(client, data): void {
        this.server.emit('onMessage', `${data} from server`)
    }
}