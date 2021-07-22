import BinaryStream from '../util/BinaryStream';
import InetAddress from '../util/InetAddress';

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

    //TODO: ADD SUPPORT FOR ipv6
    public readAddress() : InetAddress {
        const version = this.readByte();
        
        if(version === 4) {
            const address = `${(~this.readUnsignedByte()) & 0xff}.${(~this.readUnsignedByte()) & 0xff}.${(~this.readUnsignedByte()) & 0xff}.${(~this.readUnsignedByte()) & 0xff}`;
            const port = this.readUnsignedShort();

            return new InetAddress(address, port, version);
        }

        return new InetAddress('0.0.0.0', -1, -1);
    }

    //TODO: ADD SUPPORT FOR ipv6
    public writeAddress(address: InetAddress) {
        this.writeByte(address.getVersion());
        address.getAddress().split('.', 4).forEach(n => this.writeUnsignedByte((~parseInt(n)) & 0xff));
        this.writeUnsignedShort(address.getPort());
    }
}

export default Packet;