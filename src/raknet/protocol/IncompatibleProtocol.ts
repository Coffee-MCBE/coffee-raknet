import OfflinePacket from './OfflinePacket';
import ProtocolInfo from '../util/ProtocolInfo';

class IncompatibleProtocol extends OfflinePacket {

    declare public protocol: number;
    declare public serverGuid: bigint;

    constructor() {
        super(ProtocolInfo.IncompatibleProtocol);
    }

    encodePayload() {
        super.encodePayload();

        this.writeByte(this.protocol);
        this.writeMagic();
        this.writeLong(this.serverGuid);
    }
}

export default IncompatibleProtocol;