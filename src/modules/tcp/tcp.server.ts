import { Injectable } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class TcpServer {
    private server: net.Server;
    private mapSites: any;

    constructor() {
        this.mapSites = {};
        this.server = net.createServer((socket) => {
            console.log('New client connected:', socket.remoteAddress, socket.remotePort);
            this.mapSites[socket.remoteAddress] = {
                socketId: `${socket.remoteAddress}:${socket.remotePort}`,
                tcpSocket: socket,
                messagesToServer: Buffer.alloc(0),
                messagesToClient: Buffer.alloc(0)
            }
            socket.write('From NestJs TcpServer\r\n');

            let receivedData = '';

            socket.on('data', (data) => {
                receivedData += data.toString();
                if (receivedData.includes('\n')) {
                    this.mapSites[`merchantId${socket.remotePort}`].messagesToServer.write(data.toString());    // TO-DO: rename the key to equal the merchant id
                    const responseMessage = `${receivedData.trim()} from server\r\n`;
                    this.mapSites[socket.remoteAddress].messagesToClient.write(responseMessage);
                    socket.write(responseMessage);
                    receivedData = '';
                    console.log(this.mapSites)
                }
            });
        });
        this.server.listen(9050, '0.0.0.0');
    }
}
