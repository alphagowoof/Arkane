module.exports = {
    name: 'Reload',
    description: 'Reloads the whole bot for quick updates of the code',
    aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
    execute(message, args) {
        message.channel.send('Bye! :wave:');
        process.kill()
    },
};