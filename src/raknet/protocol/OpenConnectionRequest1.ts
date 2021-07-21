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

        this.mtuSize = (Buffer.byteLength(this.buffer) + 1) + 28;
        this.readMagic();
        this.protocolVersion = this.readByte();
    }

    encodePayload() {
        super.encodePayload();

        this.writeMagic();
        this.writeByte(this.protocolVersion);
        this.write(Buffer.alloc(this.mtuSize - this.buffer.length).fill(0x00));
    }
}

export default OpenConnectionRequest1;