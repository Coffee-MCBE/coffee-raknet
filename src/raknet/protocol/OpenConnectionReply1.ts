import OfflinePacket from './OfflinePacket';
import ProtocolInfo from '../util/ProtocolInfo';

class OpenConnectionReply1 extends OfflinePacket {

    declare public serverGuid: bigint;
    declare public security: boolean;
    declare public mtuSize: number;

    constructor() {
        super(ProtocolInfo.OpenConnectionReply1);
    }

    decodePayload() {
        super.decodePayload();

        this.readMagic();
        this.serverGuid = this.readLong();
        this.security = this.readBoolean();
        this.mtuSize = this.readShort();
    }

    encodePayload() {
        super.encodePayload();

        this.writeMagic();
        this.writeLong(this.serverGuid);
        this.writeBoolen(this.security); 
        this.writeShort(this.mtuSize);
    }
}

export default OpenConnectionReply1;