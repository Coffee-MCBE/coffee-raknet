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

listener.on('unconnectedPing', rinfo => {
    listener.pong(rinfo, 'Coffee Server', '390', '1.17.2', '0', '10', '19132');
});
```

## Warning
This project is under development and it is not recommended to use it.