import ProtocolInfo from '../util/ProtocolInfo';
import OfflinePacket from './OfflinePacket';

class UnconnectedPong extends OfflinePacket {

    declare public timestamp: bigint;
    declare public serverGuid: bigint;
    declare public serverName: string;

    constructor() {
        super(ProtocolInfo.UnconnectedPong);
    }

    decodePayload() : void {
        super.decodePayload();

        this.timestamp = this.readLong();
        this.serverGuid = this.readLong();
        this.readMagic();
        this.serverName = this.readRemaing().toString();
    }

    encodePayload() : void {
        super.encodePayload();

        this.writeLong(this.timestamp);
        this.writeLong(this.serverGuid);
        this.writeMagic();
        this.writeString(this.serverName);
    }
}

export default UnconnectedPong;