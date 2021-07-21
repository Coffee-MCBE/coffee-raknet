class ServerName {

    private motd: string = 'Coffee Server';
    private protcol: string = '390';
    private version: string = '1.17.2';
    private onlinePlayers: string = '0';
    private maxPlayers: string = '1';
    private port: string = '19132';

    public getMotd() : string {
        return this.motd;
    }

    public setMotd(motd: string) : void {
        this.motd = motd;
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