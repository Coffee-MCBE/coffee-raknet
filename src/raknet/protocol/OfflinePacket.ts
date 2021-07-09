import Packet from "./Packet";

const MAGIC = '\x00\xff\xff\x00\xfe\xfe\xfe\xfe\xfd\xfd\xfd\xfd\x12\x34\x56\x78';

class OfflinePacket extends Packet {

    declare public magic: Buffer;

    public readMagic() : void {
        this.magic = this.read(16);
    }

    public writeMagic() : void {
        this.write(Buffer.from(MAGIC, 'binary'));
    }
}

export default OfflinePacket;