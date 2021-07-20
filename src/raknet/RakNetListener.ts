import udp, { RemoteInfo, Socket } from 'dgram';
import Crypto from 'crypto';
import ProtocolInfo from './util/ProtocolInfo';
import UnconnectedPong from './protocol/UnconnectedPong';
import ServerName from './util/ServerName';
import { EventEmitter } from 'stream';

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