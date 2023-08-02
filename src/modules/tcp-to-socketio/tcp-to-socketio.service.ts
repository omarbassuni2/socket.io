import { Injectable } from '@nestjs/common';
import { SocketIOServer } from './socketio.server';
import { TcpServer } from './tcp.server';

@Injectable()
export class TcpToSocketioService {
    constructor(private readonly tcpServer: TcpServer) { }

    async sendMessageToCommander(merchantId, message) {
        const mapSites = this.tcpServer.getMapSites();
        if (!mapSites[merchantId]) return 'No Merchant with this Id was not found In our DB!'; // PS: We have no DB, its memory. the merchants are stored inside mapSites, this error happens if the merchant didnt't message us before the backend
        const socket = mapSites[merchantId].tcpSocket;
        mapSites[merchantId].messagesToServer.push(message)
        return socket.write(`\t${merchantId} Responded With: ${message.trim()}\r\n`);
    }
}
