import Packet from './Packet';

class OfflinePacket extends Packet {

    declare public magic: Buffer;

    public readMagic() : void {
        this.magic = this.read(16);
    }

    public writeMagic() : void {
        this.write(Buffer.from([
            0x00,
            0xff,
            0xff,
            0x00,
            0xfe,
            0xfe,
            0xfe,
            0xfe,
            0xfd,
            0xfd,
            0xfd,
            0xfd,
            0x12,
            0x34,
            0x56,
            0x78
        ]));
    }
}

export default OfflinePacket;