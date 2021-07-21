class InetAddress {

    private address: string;
    private port: number;
    private version: number;

    constructor(address: string, port: number, version: number = 4) {
        this.address = address;
        this.port = port;
        this.version = version;
    }

    public getAddress() : string {
        return this.address;
    }

    public getPort() : number {
        return this.port;
    }

    public getVersion() : number {
        return this.version;
    }
}

export default InetAddress;