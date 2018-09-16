const Discord = require('discord.js');

const TIMEOUT = 5000;

class ListBot {    
    constructor(configuration) {
        this._token = configuration.token;
        this._guild = configuration.guild;
        this._channel = configuration.channel;
        this._soundboardUser = configuration.soundboardUser;
        this._connected = false;
        this._initializeClient();
    }

    _initializeClient(command) {
        this._client = new Discord.Client();
    }

    list() {
        return new Promise((resolve, reject) => {
            this._client.on('ready', () => {
                this._connected = true;
                this._client.channels.get(this._channel).send(`${this._getSoundboardUser()} list`);
                setTimeout(() => {
                    if (this._connected) {
                        reject(new Error("Timeout"));
                        this._client.destroy();
                    }
                }, TIMEOUT);
            });

            this._client.on('message', message => {
                if (message.author.id === this._getSoundboardUser().id) {
                    const startOfContent = message.content.indexOf('**Supported sound effects**: ');
                    if (startOfContent === 0) {
                        const commandsSegment = message.content.substring(startOfContent+1);
                        const lines = commandsSegment.split(', ');
                        resolve(lines.slice(1))
                        this._client.destroy();
                        this._connected = false;
                    }
                }
            });

            this._client.login(this._token);
        });
    }

    _getSoundboardUser() {
        return this._client.guilds.get(this._guild).members.get(this._soundboardUser);
    }

    connect() {
        this._client.login(this._token);
    }
}

module.exports = ListBot;
