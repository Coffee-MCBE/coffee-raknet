import BinaryStream from '../util/BinaryStream';

class Packet extends BinaryStream {

    private id: number;

    constructor(id: number) {
        super();
        
        this.id = id;
    }

    public getId() : number {
        return this.id;
    }

    public decodePayload() : void {
        this.readByte();
    }

    public encodePayload() : void {
        this.writeByte(this.id);
    }

    public readString() : void {
        this.read(this.readShort());
    }

    public writeString(v: string) : void {
        this.writeShort(Buffer.byteLength(v));
        this.write(Buffer.from(v, 'utf-8'));
    }
}

export default Packet;