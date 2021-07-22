import Packet from './Packet';
import ProtocolInfo from '../util/ProtocolInfo';

class OfflinePacket extends Packet {

    declare public magic: Buffer;

    public readMagic() : void {
        this.magic = this.read(16);
    }

    public writeMagic() : void {
        this.write(Buffer.from(ProtocolInfo.MAGIC, 'binary'));
    }
}

export default OfflinePacket;