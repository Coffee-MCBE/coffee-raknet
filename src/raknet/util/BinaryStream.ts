class BinaryStream {

    public buffer: Buffer;
    public offset: number;

    constructor(buffer: Buffer = Buffer.alloc(0), offset: number = 0) {
        this.buffer = buffer;
        this.offset = offset;
    }

    public read(length: number) : Buffer {
        return this.buffer.slice(this.offset, this.addOffset(length, false));
    }

    public write(buffer: Buffer) : void {
        this.buffer = Buffer.concat([this.buffer, buffer]);
    }

    public readByte() : number {
        return this.buffer.readInt8(this.addOffset(1));
    }

    public writeByte(v: number) : void {
        const buf = Buffer.alloc(1);

        buf.writeInt8(v);
        this.write(buf);
    }

    public readUnsignedByte() : number {
        return this.buffer.readUInt8(this.addOffset(1));
    }

    public writeUnsignedByte(v: number) : void {
        const buf = Buffer.alloc(1);

        buf.writeUInt8(v);
        this.write(buf);
    }

    public readInt() : number {
        return this.buffer.readInt32BE(this.addOffset(4));
    }

    public writeInt(v: number) : void {
        const buf = Buffer.alloc(4);

        buf.writeInt32BE(v);
        this.write(buf);
    }

    public readUnsignedInt() : number {
        return this.buffer.readUInt32BE(this.addOffset(4));
    }

    public writeUnsignedInt(v: number) : void {
        const buf = Buffer.alloc(4);

        buf.writeUInt32BE(v);
        this.write(buf);
    }

    public readShort() : number {
        return this.buffer.readInt16BE(this.addOffset(2));
    }

    public writeShort(v: number) : void {
        const buf = Buffer.alloc(2);
        
        buf.writeInt16BE(v);
        this.write(buf);
    }

    public readLong() : bigint {
        return this.buffer.readBigInt64BE(this.addOffset(8));
    }

    public writeLong(v: bigint) : void {
        const buf = Buffer.alloc(8);

        buf.writeBigInt64BE(v);
        this.write(buf);
    }

    public readString() : string {
        return this.read(this.readShort()).toString();
    }

    public writeString(v: string) : void {
        this.writeShort(Buffer.byteLength(v));
        this.write(Buffer.from(v, 'utf-8'));
    }

    public readBoolean() : boolean {
        return this.readByte() == 0 ? false : true;
    }

    public writeBoolen(v: boolean) : void {
        this.writeByte(v ? 1 : 0);
    }

    public addOffset(offset: number, prev: boolean = true) : number {
        return prev
        ? (this.offset += offset) - offset
        : this.offset += offset
    }

    public reset(offset: number = 0) : void {
        this.buffer = Buffer.alloc(0);
        this.offset = offset;
    }
}

export default BinaryStream;