import OfflinePacket from './OfflinePacket';

class OpenConnectionReply1 extends OfflinePacket {

    declare public serverGuid: bigint;
    declare public security: boolean;
    declare public mtuSize: number;

    constructor() {
        super(0x06);
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