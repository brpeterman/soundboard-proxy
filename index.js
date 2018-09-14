const CommandBot = require('./src/command-bot');

const env = process.env.NODE_ENV || 'development';
const config = require(`./config/${env}.json`);

process.on('unhandledRejection', error => {
    throw error;
});

exports.commandHandler = (event, context, callback) => {
    const command = event.command;
    const bot = new CommandBot(config, command);
    bot.connect();
};
