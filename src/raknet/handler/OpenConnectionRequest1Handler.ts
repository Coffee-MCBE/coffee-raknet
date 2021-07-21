import PacketHandler from './PacketHandler';
import RakNetListener from '../RakNetListener';
import OpenConnectionRequest1 from '../protocol/OpenConnectionRequest1';
import OpenConnectionReply1 from '../protocol/OpenConnectionReply1';


class OpenConnectionRequest1Handler extends PacketHandler {
    
    public handle(listener: RakNetListener, buffer: Buffer) : Buffer {
        const decodePacket = new OpenConnectionRequest1();

        decodePacket.buffer = buffer;
        decodePacket.decodePayload();

        const pkt = new OpenConnectionReply1();

        pkt.serverGuid = listener.getGuid();
        pkt.security = false;
        pkt.mtuSize = decodePacket.mtuSize;
        pkt.encodePayload();

        return pkt.buffer;
    }

}

export default OpenConnectionRequest1Handler;