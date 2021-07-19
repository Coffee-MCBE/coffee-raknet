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
        return this.buffer.readUInt8(this.addOffset(1));
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

    public readRemaing() : Buffer {
        const buf = this.buffer.slice(this.offset);
        this.offset = this.buffer.length;
        return buf;
    }

    public addOffset(offset: number, prev: boolean = true) : number {
        return prev
        ? (this.offset += offset) - offset
        : this.offset += offset;
    }
}

export default BinaryStream;
