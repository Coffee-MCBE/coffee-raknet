import PacketHandler from './PacketHandler';
import RakNetListener from '../RakNetListener';
import UnconnectedPing from '../protocol/UnconnectedPing';
import UnconnectedPong from '../protocol/UnconnectedPong';

class UnconnectedPingHandler extends PacketHandler {
    
    public handle(listener: RakNetListener, buffer: Buffer) : Buffer {
        const decodePacket = new UnconnectedPing();
        
        const pkt = new UnconnectedPong();

        pkt.timestamp = BigInt(Date.now());
        pkt.serverGuid = listener.getGuid();
        pkt.serverName = listener.getServerName().toString();

        pkt.encodePayload();
        listener.emit('unconnectedPing', listener.getServerName());
        
        return pkt.buffer;
    }

}

export default UnconnectedPingHandler;