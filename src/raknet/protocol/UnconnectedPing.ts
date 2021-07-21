import ProtocolInfo from '../util/ProtocolInfo';
import OfflinePacket from './OfflinePacket';

class UnconnectedPing extends OfflinePacket {

    declare public timestamp: bigint;
    declare public clinetGuid: bigint;

    constructor() {
        super(ProtocolInfo.UnconnectedPing);
    }

    decodePayload() : void {
        super.decodePayload();

        this.timestamp = this.readLong();
        this.readMagic();
        this.clinetGuid = this.readLong();
    }

    encodePayload() : void {
        this.encodePayload();

        this.writeLong(this.timestamp);
        this.writeMagic();
        this.writeLong(this.clinetGuid);
    }
}

export default UnconnectedPing;