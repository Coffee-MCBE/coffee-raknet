import PacketHandler from './PacketHandler';
import RakNetListener from '../RakNetListener';
import OpenConnectionRequest2 from '../protocol/OpenConnectionRequest2';

class OpenConnectionRequest2Handler extends PacketHandler {
    
    public handle(listener: RakNetListener, buffer: Buffer) : Buffer {
        const pkt = new OpenConnectionRequest2();

        pkt.buffer = buffer;
        pkt.decodePayload();

        console.log("adrress: " + pkt.address.getAddress());

        return pkt.buffer;
    }

}

export default OpenConnectionRequest2Handler;