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
        //EMPTY
    }
}

export default UnconnectedPing;