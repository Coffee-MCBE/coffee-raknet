class ServerName {

    private motd: string;
    private protcol: string;
    private version: string;
    private onlinePlayers: string;
    private maxPlayers: string;
    private port: string;

    constructor(motd: string, protocol: string, version: string, onlinePlayers: string, maxPlayers: string, port: string) {
        this.motd = motd;
        this.protcol = protocol;
        this.version = version;
        this.onlinePlayers = onlinePlayers;
        this.maxPlayers = maxPlayers;
        this.port = port;
    }

    public toString() : string {
        return [
            'MCPE',
            this.motd,
            this.protcol,
            this.version,
            this.onlinePlayers,
            this.maxPlayers,
            '13253860892328930865',
            'Bedrock level',
            'Survival',
            '1',
            this.port,
            '19133'

        ].join(';') + ';';
    }
}

export default ServerName;