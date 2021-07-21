# Coffee RakNet
Coffee RakNet is a simple RakNet wrote in TypeScript based on [Raknet Protcol](https://wiki.vg/Raknet_Protocol).

## Run
``` text
npm start
```

## Example code
``` javascript
const listener = new RakNetListener().listen(19132);

listener.on('start', () => console.log('[Coffee RakNet] Server started!'));
listener.on('unconnectedPing', pong => pong.setMotd('Coffee Server'));
```

## Warning
This project is under development and it is not recommended to use it.