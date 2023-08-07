import { Inject, OnModuleInit, forwardRef } from "@nestjs/common";
import { WebSocketGateway, SubscribeMessage, WebSocketServer } from "@nestjs/websockets";
import { TcpToSocketioService } from "./tcp-to-socketio.service";
import { XMLParser } from 'fast-xml-parser';
import { findMerchantIDUsingStringify } from "src/common/utility";

@WebSocketGateway(9000)
export class SocketIOServer implements OnModuleInit {
    @Inject(forwardRef(() => TcpToSocketioService)) tcpToSocketio: TcpToSocketioService;
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
    async handleMessage(client, data) {
        const MerchantID = findMerchantIDUsingStringify(new XMLParser().parse(data))
        if (MerchantID) {
            const response = await this.tcpToSocketio.sendMessageToCommander(MerchantID, data);
        }
    }

    async sendMessageToBackend(message) {
        try {
            this.server.emit('onMessage', message)
        } catch (error) {
            console.log(error)
        }
    }

    getServer() {
        return this.server;
    }


}