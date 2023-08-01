import { OnModuleInit } from "@nestjs/common";
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway(1)
export class SocketIoGateway implements OnModuleInit {

    @WebSocketServer()
    private server: any;

    onModuleInit() {
        try {
            this.server.on('connection', (socket) => {
                console.log(socket.id, ': Connected')
            })
        } catch (error) {
            console.log(error)
        }
    }

    @SubscribeMessage('message')
    handleMessage(client, data): void {
        this.server.emit('onMessage', `${data} from server`)
    }
}