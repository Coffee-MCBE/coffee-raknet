import PacketHandler from './PacketHandler';
import RakNetListener from '../RakNetListener';
import OpenConnectionRequest1 from '../protocol/OpenConnectionRequest1';
import OpenConnectionReply1 from '../protocol/OpenConnectionReply1';
import ProtocolInfo from '../util/ProtocolInfo';
import IncompatibleProtocol from '../protocol/IncompatibleProtocol';

class OpenConnectionRequest1Handler extends PacketHandler {
    
    public handle(listener: RakNetListener, buffer: Buffer) : Buffer {
        const decodePacket = new OpenConnectionRequest1();

        decodePacket.buffer = buffer;
        decodePacket.decodePayload();

        if(decodePacket.protocolVersion !== ProtocolInfo.CURRENT_PROTOCOL) {
            const pkt = new IncompatibleProtocol();

            pkt.protocol = decodePacket.protocolVersion;
            pkt.serverGuid = listener.getGuid();

            pkt.encodePayload();

            return pkt.buffer;
        }

        const pkt = new OpenConnectionReply1();

        pkt.serverGuid = listener.getGuid();
        pkt.security = false;
        pkt.mtuSize = decodePacket.mtuSize;
        pkt.encodePayload();

        return pkt.buffer;
    }

}

export default OpenConnectionRequest1Handler;