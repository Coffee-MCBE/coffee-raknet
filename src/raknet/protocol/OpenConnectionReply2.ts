import OfflinePacket from './OfflinePacket';
import ProtocolInfo from '../util/ProtocolInfo';
import InetAddress from '../util/InetAddress';

class OpenConnectionReply2 extends OfflinePacket {

    declare public serverGuid: bigint;
    declare public clientAddress: InetAddress;
    declare public mtuSize: number;
    declare public enableEcryption: boolean;

    constructor() {
        super(ProtocolInfo.OpenConnectionReply2);
    }

    decodePayload() {
        super.decodePayload()

        this.readMagic();
        this.serverGuid = this.readLong();
        this.clientAddress = this.readAddress();
        this.mtuSize = this.readShort();
        this.enableEcryption = this.readBoolean();
    }

    encodePayload() {
        super.encodePayload();
    
        this.writeMagic();
        this.writeLong(this.serverGuid);
        this.writeAddress(this.clientAddress);
        this.writeShort(this.mtuSize);
        this.writeBoolen(this.enableEcryption);
    }
}

export default OpenConnectionReply2;