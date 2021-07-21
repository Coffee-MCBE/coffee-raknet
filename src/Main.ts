import RakNetListener from './raknet/RakNetListener';

const listener = new RakNetListener().listen(19132);

listener.on('start', () => console.log('[Coffee RakNet] Server started!'));
listener.on('unconnectedPing', pong => pong.setMotd('Coffee Server'));