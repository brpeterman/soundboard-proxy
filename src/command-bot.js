const Discord = require('discord.js');

class CommandBot {
    constructor(configuration, command) {
        this.token = configuration.token;
        this.guild = configuration.guild;
        this.channel = configuration.channel;
        this.soundboardUser = configuration.soundboardUser;
        this._initializeClient(command);
    }

    _initializeClient(command) {
        this.client = new Discord.Client();
        this.client.on('ready', () => {
            this.client.channels.get(this.channel).send(this._command(command));
            this.client.destroy();
        });
    }

    _command(command) {
        return `${this._getSoundboardUser()} play ${command}`;
    }

    _getSoundboardUser() {
        return this.client.guilds.get(this.guild).members.get(this.soundboardUser);
    }

    connect() {
        this.client.login(this.token);
    }
}

module.exports = CommandBot;
