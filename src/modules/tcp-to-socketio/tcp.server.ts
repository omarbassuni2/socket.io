import { Inject, Injectable, forwardRef } from '@nestjs/common';
import * as net from 'net';
import { SocketIOServer } from './socketio.server';
import { XMLParser } from 'fast-xml-parser';
import { findMerchantIDUsingStringify } from 'src/common/utility';

@Injectable()
export class TcpServer {
    private server: net.Server;
    private mapSites: any;
    @Inject(SocketIOServer) socketIOServer: SocketIOServer;

    constructor() {
        this.mapSites = {};
        this.server = net.createServer((socket) => {
            socket.write('Session Started ' + `${socket.remoteAddress}:${socket.remotePort} \r\n`);

            let receivedData = '';

            socket.on('data', async (data) => {
                receivedData += data.toString();
                if (receivedData.includes('</NAXMLMobile>')) {
                    const MerchantID = findMerchantIDUsingStringify(new XMLParser().parse(receivedData))
                    if (MerchantID) {
                        await this.socketIOServer.sendMessageToBackend(receivedData);
                        this.mapSites[MerchantID] = {
                            socketId: `${socket.remoteAddress}:${socket.remotePort}`,
                            tcpSocket: socket,
                            messagesToServer: [],
                            messagesToClient: [receivedData]
                        }
                        receivedData = '';
                    } else {
                        socket.write('This XML needs to have atleast MerchantID!');
                    }
                }
            });

            socket.on('error', (error) => {
                console.error('Socket error:', error);
            });
        });
        this.server.listen(9050, '0.0.0.0');
    }

    getMapSites() {
        return this.mapSites;
    }
}
