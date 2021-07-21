import RakNetListener from '../RakNetListener';

abstract class PacketHandler {

    public abstract handle(listener: RakNetListener, buffer: Buffer) : Buffer;

}

export default PacketHandler;