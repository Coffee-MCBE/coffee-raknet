import udp, { RemoteInfo, Socket } from 'dgram';
import Crypto from 'crypto';
import ProtocolInfo from './util/ProtocolInfo';
import UnconnectedPong from './protocol/UnconnectedPong';
import ServerName from './util/ServerName';
import { EventEmitter } from 'stream';
import OpenConnectionRequest1 from './protocol/OpenConnectionRequest1';
import OpenConnectionReply1 from './protocol/OpenConnectionReply1';

class RakNetListener extends EventEmitter {

    private guid: bigint;

    declare private socket: Socket;

    constructor() {
        super();
        this.guid = Crypto.randomBytes(8).readBigInt64BE();
    }

    public listen(port: number) : RakNetListener {
        this.socket = udp.createSocket({ type: 'udp4' });

        this.socket.on('message', (buffer, rinfo) => this.handle(buffer, rinfo));
        this.socket.on('listening', () => this.emit('start'));

        this.socket.bind(port);

        return this;
    }

    public handle(buffer: Buffer, rinfo: RemoteInfo) : void {
        const pid = buffer.readUInt8();

        switch(pid) {
            case ProtocolInfo.UnconnectedPing:
                this.emit('unconnectedPing', rinfo);
                break;
            case ProtocolInfo.OpenConnectionRequest1:
                const decodePacket = new OpenConnectionRequest1();

                decodePacket.buffer = buffer;
                decodePacket.decodePayload();

                const pkt = new OpenConnectionReply1();

                pkt.serverGuid = this.guid;
                pkt.security = false;
                pkt.mtuSize = decodePacket.mtuSize;
                pkt.encodePayload();

                this.sendBuffer(pkt.buffer, rinfo);
                break;
            case ProtocolInfo.OpenConnectionRequest2:
                console.log("pkt");
                break;
        }
    }

    public pong(rinfo: RemoteInfo, motd: string, protocol: string, version: string, players: string, onlinePlayers: string, port: string) : void {
        const pkt = new UnconnectedPong();

        pkt.timestamp = BigInt(Date.now());
        pkt.serverGuid = this.guid;
        pkt.serverName = new ServerName(motd, protocol, version, players, onlinePlayers, port).toString();

        pkt.encodePayload();
        this.sendBuffer(pkt.buffer, rinfo);
    }

    public sendBuffer(buffer: Buffer, rinfo: RemoteInfo) : void {
        this.socket.send(buffer, 0, buffer.length, rinfo.port, rinfo.address)
    }
}

export default RakNetListener;