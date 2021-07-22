import PacketHandler from './PacketHandler';
import RakNetListener from '../RakNetListener';
import OpenConnectionRequest2 from '../protocol/OpenConnectionRequest2';
import OpenConnectionReply2 from '../protocol/OpenConnectionReply2';

class OpenConnectionRequest2Handler extends PacketHandler {
    
    public handle(listener: RakNetListener, buffer: Buffer) : Buffer {
        const decodePacket = new OpenConnectionRequest2();

        decodePacket.buffer = buffer;
        decodePacket.decodePayload();
  
        const pkt = new OpenConnectionReply2();

        pkt.serverGuid = listener.getGuid();
        pkt.clientAddress = decodePacket.address;
        pkt.mtuSize = decodePacket.mtuSize;
        pkt.enableEcryption = false;

        pkt.encodePayload();

        return pkt.buffer;
    }

}

export default OpenConnectionRequest2Handler;