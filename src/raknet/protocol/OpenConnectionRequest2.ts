import OfflinePacket from './OfflinePacket';
import ProtocolInfo from '../util/ProtocolInfo';
import InetAddress from '../util/InetAddress';

class OpenConnectionRequest2 extends OfflinePacket {

    declare public address: InetAddress;
    declare public mtuSize: number;
    declare public clientGuid: bigint;

    constructor() {
        super(ProtocolInfo.OpenConnectionRequest2);
    }

    decodePayload() {
        super.decodePayload();

        this.readMagic();
        this.address = this.readAddress();
        this.mtuSize = this.readShort();
        this.clientGuid = this.readLong();
    }

    encodePayload() {
        super.encodePayload();

        this.writeMagic();
        this.writeAddress(this.address);
        this.writeShort(this.mtuSize);
        this.writeLong(this.clientGuid);
    }
}

export default OpenConnectionRequest2;