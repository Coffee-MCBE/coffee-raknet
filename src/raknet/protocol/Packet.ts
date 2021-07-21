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
    public readAddress() : InetAddress|null {
        const version = this.readByte();
        
        if(version === 4) {
            const address = `${(~this.readByte()) & 0xff}.${(~this.readByte()) & 0xff}.${(~this.readByte()) & 0xff}.${(~this.readByte()) & 0xff}`;
            const port = this.readUnsignedShort();

            return new InetAddress(address, port, version);
        }

        return null;
    }

    //TODO: ADD SUPPORT FOR ipv6
    public writeAddress(address: InetAddress) {
        this.writeByte(address.getVersion());
        address.getAddress().split('.', 4).forEach(n => this.writeByte((~parseInt(n)) & 0xff));
        this.writeUnsignedShort(address.getPort());
    }
}

export default Packet;