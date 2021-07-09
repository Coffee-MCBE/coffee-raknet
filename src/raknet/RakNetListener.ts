import udp, { RemoteInfo, Socket } from 'dgram';
import Crypto from 'crypto';
import ProtocolInfo from './util/ProtocolInfo';
import UnconnectedPong from './protocol/UnconnectedPong';
import ServerName from './util/ServerName';

class RakNetListener {

    declare private socket: Socket;

    private id: bigint;

    constructor() {
        this.id = Crypto.randomBytes(8).readBigInt64BE();
    }

    public listen(port: number) : RakNetListener {
        this.socket = udp.createSocket({ type: 'udp4' });

        this.socket.on('message', (buffer, rinfo) => this.handle(buffer, rinfo));
        this.socket.bind(port);

        return this;
    }

    public handle(buffer: Buffer, rinfo: RemoteInfo) {
        const pid = buffer.readUInt8();

        switch(pid) {
            case ProtocolInfo.UnconnectedPing:
                const pkt = new UnconnectedPong();

                pkt.timestamp = BigInt(Date.now());
                pkt.serverGuid = this.id;
                pkt.serverName = new ServerName('Coffee Server', '390', '1.17.2', '0', '1', '19132').toString();

                pkt.encodePayload();
                this.sendBuffer(pkt.buffer, rinfo);
                break;
        }
    }

    public sendBuffer(buffer: Buffer, rinfo: RemoteInfo) {
        this.socket.send(buffer, 0, buffer.length, rinfo.port, rinfo.address)
    }
}

export default RakNetListener;