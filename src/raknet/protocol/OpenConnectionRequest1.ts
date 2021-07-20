import OfflinePacket from './OfflinePacket';
import ProtocolInfo from '../util/ProtocolInfo';

class OpenConnectionRequest1 extends OfflinePacket {


    declare public protocolVersion: number;
    declare public mtuSize: number;

    constructor() {
        super(ProtocolInfo.OpenConnectionRequest1);
    }

    decodePayload() {
        super.decodePayload();

        this.readMagic();
        this.protocolVersion = this.readByte();
        this.mtuSize = this.readShort();
    }

    encodePayload() {
        super.encodePayload();

        this.writeMagic();
        this.writeByte(this.protocolVersion);
        this.writeShort(this.mtuSize);
    }
}

export default OpenConnectionRequest1;