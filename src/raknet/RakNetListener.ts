import udp, { RemoteInfo, Socket } from 'dgram';
import Crypto from 'crypto';
import ProtocolInfo from './util/ProtocolInfo';
import ServerName from './util/ServerName';
import { EventEmitter } from 'stream';
import OpenConnectionRequest1Handler from './handler/OpenConnectionRequest1Handler';
import OpenConnectionRequest2Handler from './handler/OpenConnectionRequest2Handler';
import UnconnectedPingHandler from './handler/UnconnectedPingHandler';

class RakNetListener extends EventEmitter {

    private guid: bigint;
    private serverName: ServerName;

    declare private socket: Socket;

    constructor() {
        super();

        this.guid = Crypto.randomBytes(8).readBigInt64BE();
        this.serverName = new ServerName();
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
                this.sendBuffer(new UnconnectedPingHandler().handle(this, buffer), rinfo);
                break;
            case ProtocolInfo.OpenConnectionRequest1:
                this.sendBuffer(new OpenConnectionRequest1Handler().handle(this, buffer), rinfo);
                break;
            case ProtocolInfo.OpenConnectionRequest2:
                new OpenConnectionRequest2Handler().handle(this, buffer);
                break;
        }
    }

    public sendBuffer(buffer: Buffer, rinfo: RemoteInfo) : void {
        this.socket.send(buffer, 0, buffer.length, rinfo.port, rinfo.address)
    }

    public getGuid() : bigint {
        return this.guid;
    }

    public getServerName() : ServerName {
        return this.serverName;
    }
}

export default RakNetListener;