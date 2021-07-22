export default {
    CURRENT_PROTOCOL: 10,
    MAGIC: '\x00\xff\xff\x00\xfe\xfe\xfe\xfe\xfd\xfd\xfd\xfd\x12\x34\x56\x78',

    UnconnectedPing: 0x01,
    UnconnectedPong: 0x1c,
    OpenConnectionRequest1: 0x05,
    OpenConnectionReply1: 0x06,
    OpenConnectionRequest2: 0x07,
    OpenConnectionReply2: 0x08,
    IncompatibleProtocol: 0x19
}