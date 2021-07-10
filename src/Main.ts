import RakNetListener from './raknet/RakNetListener';

const listener = new RakNetListener().listen(19132);

listener.on('unconnectedPing', rinfo => {
    listener.pong(rinfo, 'Coffee Server', '390', '1.17.2', '0', '15', '19132');
});