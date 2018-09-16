const Discord = require('discord.js');

class CommandBot {
    constructor(configuration, command) {
        this._token = configuration.token;
        this._guild = configuration.guild;
        this._channel = configuration.channel;
        this._soundboardUser = configuration.soundboardUser;
        this._initializeClient(command);
    }

    _initializeClient(command) {
        this._client = new Discord.Client();
        this._client.on('ready', () => {
            this._client.channels.get(this._channel).send(this._command(command));
            this._client.destroy();
        });
    }

    _command(command) {
        return `${this._getSoundboardUser()} play ${command}`;
    }

    _getSoundboardUser() {
        return this._client.guilds.get(this._guild).members.get(this._soundboardUser);
    }

    connect() {
        this._client.login(this._token);
    }
}

module.exports = CommandBot;
